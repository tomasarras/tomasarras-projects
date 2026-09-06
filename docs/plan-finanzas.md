# Plan: Sección privada de Finanzas (Casa + S&P500)

Estado: **implementado (v1)**. Backend en `tomasarras-projects` (rama `portfolio`), frontend en `frontend/tomasarras-projects` (rama `main`, ruta `/finanzas`).

## 1. Interpretación del pedido

Querés una vista privada (password-only, sin usuario) para llevar dos cosas que hoy anotás en un cuaderno:

1. **Casa (USD 80.000)**: cada pago que hacés (ARS + USD equivalente al dólar del día + fecha + nota opcional). Ver: círculo de progreso pagado/restante, cuánto falta en dinero, cuánto falta en tiempo (asumiendo una cuota mensual en USD configurable, hoy 500), cantidad de pagos, y tabla histórica.
2. **S&P500 / retiro**: cada aporte mensual (mismo esquema ARS/USD/fecha/nota), con una meta de retiro a los 65 años (naciste 1999-09-10) de USD 7.000/mes, y una tasa de rendimiento anual estimada configurable (10% optimista / 5% conservador). Ver: total invertido, proyección de fondo al retiro, ingreso mensual proyectado, y comparación contra la meta.

Ambas vistas comparten la misma mecánica (login, carga de pagos ARS/USD, tabla, configuración editable), así que conviene construir un único modelo/componentes reutilizables en vez de duplicar código para "casa" y "sp500".

Arquitectura existente que vamos a reusar:

- **Backend**: `tomasarras-projects` (este repo), rama `portfolio`, Next.js App Router (`src/app/api/**/route.js`), Postgres vía `pg-promise` (`db/index.js`, singleton en `global`). Ya existe un patrón de login con password + JWT en `src/app/api/auth/login/route.js`, pero ahí incluye 2FA por Telegram e IP-binding — para Finanzas el pedido es explícitamente **sin 2FA, lo más básico posible**.
- **Frontend**: `frontend/tomasarras-projects`, rama `main`, Next.js Pages Router, deploy en Vercel. Ya existe un patrón de página protegida por password en `pages/auth/index.js` (guarda el JWT en `useState`, lo manda como `Authorization: Bearer` a `axios/axiosInstance.js`, que apunta a `NEXT_PUBLIC_AUTH_SERVER`, es decir el backend en el VPS).

## 2. Modelo de datos (Postgres, backend)

Una sola tabla de pagos con un discriminador de categoría (mismo shape para casa y sp500, evita duplicar esquema/consultas):

```sql
CREATE TABLE IF NOT EXISTS finance_payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR NOT NULL CHECK (category IN ('house', 'sp500')),
  payment_date DATE NOT NULL,
  amount_ars NUMERIC NOT NULL,
  amount_usd NUMERIC NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Configuración editable, fila única (no hace falta historizar cambios; el cálculo siempre usa el valor vigente):

```sql
CREATE TABLE IF NOT EXISTS finance_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  house_goal_usd NUMERIC NOT NULL DEFAULT 80000,
  house_monthly_target_usd NUMERIC NOT NULL DEFAULT 500,
  sp500_monthly_target_usd NUMERIC NOT NULL DEFAULT 200,
  sp500_annual_return_pct NUMERIC NOT NULL DEFAULT 10,
  sp500_retirement_goal_monthly_usd NUMERIC NOT NULL DEFAULT 7000,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Se crean de forma perezosa (`CREATE TABLE IF NOT EXISTS` + insert de la fila `id=1` si no existe), igual que `init()` en `src/app/api/utils.js` — sin herramienta de migraciones, siguiendo la convención actual del repo.

La fecha de nacimiento (1999-09-10) y la edad de retiro (65) quedan como constantes en el código del backend, no en la base — no hace falta que sean editables.

## 3. Endpoints (backend, `src/app/api/finance/*`)

Nuevo archivo `src/app/api/finance/utils.js` (paralelo a `src/app/api/utils.js`) con:
- `init(db)` — crea las tablas de arriba.
- `isValidFinanceToken(req)` — `jwt.verify` simple contra `FINANCE_JWT_SECRET`, sin rotación ni IP-binding (a diferencia de `isValidToken` del auth 2FA). Si expira, el frontend vuelve a pedir password.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/finance/login` | password en body | Compara `password` contra `process.env.FINANCE_PASSWORD` (comparación simple, igual que `AUTH_PASSWORD` hoy), devuelve JWT con expiración larga (ej. 90 días, pensado para no tener que loguearte todo el tiempo desde el celu). |
| GET | `/api/finance/overview?sp500ReturnPct=` | Bearer | Devuelve todo lo que necesita la UI en un solo llamado: `settings`, stats calculadas de casa, stats calculadas de sp500 (con override opcional de `sp500ReturnPct` para comparar escenarios sin persistirlo), y los pagos de ambas categorías. |
| PUT | `/api/finance/settings` | Bearer | Actualiza uno o más campos de `finance_settings`. |
| POST | `/api/finance/payments` | Bearer | Body `{ category, paymentDate, amountArs, amountUsd, note }` → inserta y devuelve el pago creado. |
| DELETE | `/api/finance/payments/[id]` | Bearer | Borra un pago cargado por error. |

Todas (salvo `login`) responden 401 si el JWT no es válido/expiró.

Nota de seguridad: este endpoint queda expuesto públicamente en el VPS igual que `/api/auth/login`. Recomiendo sumar el mismo rate-limit por IP que ya existe para el login de 2FA (tabla `ip_list`, funciones `checkIp`/`recordAttempt` en `src/app/api/utils.js`) para que un password de una sola palabra no quede reventable por fuerza bruta. Es poco código extra porque ya está escrito — lo marco como parte del plan salvo que prefieras omitirlo.

## 4. Cálculos

**Casa:**
- `totalPaidUsd = sum(amount_usd) where category='house'`
- `remainingUsd = houseGoalUsd - totalPaidUsd`
- `progressPct = totalPaidUsd / houseGoalUsd`
- `monthsRemaining = ceil(remainingUsd / houseMonthlyTargetUsd)`
- `paymentsCount = count(*)`

**S&P500 / retiro** (estilo calculadora de interés compuesto tipo investor.gov):
- Edad y meses restantes hasta los 65 se calculan en el momento de la consulta a partir de la fecha de nacimiento fija (1999-09-10) y la fecha actual del servidor — así el número se va actualizando solo con el tiempo, no hay que tocar nada a mano.
- `r = annualReturnPct / 100 / 12` (tasa mensual), `n` = meses restantes hasta los 65.
- `projectedRetirementFundUsd = totalInvestedUsd * (1+r)^n + monthlyTargetUsd * (((1+r)^n - 1) / r) * (1+r)` (valor futuro de un capital inicial + una anualidad mensual, asumiendo que seguís aportando `sp500MonthlyTargetUsd` todos los meses hasta el retiro).
- `projectedMonthlyIncomeUsd = (projectedRetirementFundUsd * annualReturnPct/100) / 12` (viviendo solo de la renta, sin tocar el capital).
- `goalProgressPct = projectedMonthlyIncomeUsd / sp500RetirementGoalMonthlyUsd`.
- El parámetro `sp500ReturnPct` de query permite recalcular todo esto con un % distinto al guardado (para comparar 5% vs 10%) sin persistir nada.

## 5. Frontend (`frontend/tomasarras-projects`, Pages Router)

Nueva ruta `pages/finanzas/index.js` (a confirmar el nombre), calcada en estructura a `pages/auth/index.js`:

- Pantalla de login: mismo patrón (`Input` password + `Loader`, POST a `/api/finance/login`, guarda el JWT).
- Persistencia de sesión: a diferencia de `/auth` (que vive solo en memoria porque el JWT dura 5 minutos), acá conviene guardar el JWT en `localStorage` ya que dura ~90 días y querés entrar desde el iPhone sin re-loguearte todo el tiempo. Un botón de "salir" limpia el storage.
- Dos secciones/tabs: **Casa** y **S&P500**, compartiendo componentes:
  - `ProgressDonut` — SVG circular hecho a mano (sin librería nueva) mostrando % pagado vs % restante, con el label del porcentaje en el centro.
  - `StatsGrid` — tarjetas con los números clave de cada sección.
  - `PaymentsTable` — tabla de pagos (fecha, ARS, USD, tasa implícita ARS/USD, nota), con botón de borrar por fila.
  - `PaymentForm` — alta de pago (fecha default hoy, monto ARS, monto USD, nota opcional), reutilizado por ambas secciones vía prop `category`.
  - `SettingsPanel` — edición de `houseMonthlyTargetUsd` / `sp500MonthlyTargetUsd` / `sp500AnnualReturnPct` / `sp500RetirementGoalMonthlyUsd`, con un toggle rápido 5%/10%/personalizado para la tasa de S&P500 (usa el override de `overview` sin guardar hasta que confirmes el cambio).

Nueva instancia de axios no hace falta — se reusa `axios/axiosInstance.js` (mismo `NEXT_PUBLIC_AUTH_SERVER`), solo cambian las rutas (`/api/finance/...`).

## 6. Variables de entorno nuevas (backend, `.env`)

```
FINANCE_PASSWORD=...
FINANCE_JWT_SECRET=...
```

(Separadas de `AUTH_PASSWORD`/`JWT_SECRET` para no mezclar el radio de exposición de ambas features.)

## 7. Integración con Bull Market (CEDEARs de S&P500)

Para traer automáticamente cuánto tenés invertido sin loguearte a tu cuenta: es poco probable que Bull Market exponga un endpoint público que devuelva tu **posición personal** sin autenticación — eso es información de cuenta, no una cotización pública. Lo que sí podría existir es un endpoint público de *cotización* del CEDEAR (precio), pero eso no te dice cuántas unidades tenés ni cuánto invertiste realmente (que es lo que ya registrás vos a mano con el precio del dólar del día).

Propuesta: **arrancar con carga manual** (idéntico al esquema de la casa: ARS + USD del momento + fecha + nota) y dejar la integración automática con Bull Market como una investigación aparte (inspeccionar las requests de red de su web app logueado para ver si hay algún endpoint semi-público de posición) — no lo incluyo en el alcance de esta primera versión para no bloquear el resto en algo incierto.

## 8. Fuera de alcance v1 (mejoras futuras posibles)

- Autocompletar el dólar del día en el form (vía alguna API pública tipo DolarAPI/Bluelytics) en vez de tipearlo vos.
- Edición de pagos ya cargados (v1 solo permite alta y borrado).
- Export CSV / backup de la tabla de pagos.
- Integración real con Bull Market (ver punto 7).
- Gráfico de evolución histórica (no solo el donut de progreso actual).

## 9. Orden de implementación sugerido

1. Backend: tablas + `finance/utils.js` (init, login, verificación de token).
2. Backend: endpoints `login`, `payments` (POST/DELETE), `settings` (PUT), `overview` (GET con los cálculos).
3. Frontend: página de login + guardado de token en localStorage.
4. Frontend: componentes compartidos (`ProgressDonut`, `StatsGrid`, `PaymentsTable`, `PaymentForm`).
5. Frontend: sección Casa completa, conectada a `overview`.
6. Frontend: sección S&P500 completa (incluye el toggle 5%/10%).
7. Frontend: `SettingsPanel` para editar los parámetros mensuales/tasa/meta.
8. (Opcional) Rate-limit por IP en `/api/finance/login`.

## 10. Decisiones confirmadas

- Ruta del frontend: **`/finanzas`**.
- Rate-limit por IP en el login: **incluido** (tabla `finance_ip_list`, banea/bloquea igual que en el login de 2FA pero independiente de esa tabla).
- Donut de progreso: **SVG a mano**, sin librería nueva.

## 11. Cómo probarlo

Backend (`tomasarras-projects`, rama `portfolio`):
1. Agregar a `.env`: `FINANCE_PASSWORD`, `FINANCE_JWT_SECRET` (y opcionalmente `FINANCE_TOKEN_EXPIRATION`, default `90d`).
2. Levantar Postgres si no está corriendo: `docker-compose up -d`.
3. `npm run dev`. Las tablas (`finance_payment`, `finance_settings`, `finance_ip_list`) se crean solas en el primer request a cualquier endpoint de `/api/finance/*` (no hace falta migración manual).

Frontend (`frontend/tomasarras-projects`, rama `main`):
1. Verificar que `NEXT_PUBLIC_AUTH_SERVER` en `.env` apunte al backend (`http://localhost:3000` en dev).
2. `npm install` (si no tiene `node_modules` instalado) y `npm run dev`.
3. Entrar a `/finanzas`, loguear con `FINANCE_PASSWORD`, cargar algún pago de prueba en "Casa" y en "S&P500", y confirmar que el donut, las estadísticas y la tabla se actualizan.

## 12.5 Ajustes post-v1 (sesión de testing)

- **Capitalización anual, no mensual**: la proyección de retiro compuestea una vez al año (aportes del año sumados, interés aplicado a fin de año), igual que investor.gov, para no inflar la tasa declarada.
- **"Valor estimado hoy"** (nuevo, separado de "Total invertido"): usa precios reales de SPY (Yahoo Finance, sin API key, `src/app/api/finance/sp500History.js`). El precio de SPY en la fecha de cada aporte se guarda **una sola vez** en la columna `spy_price_at_payment` al cargar el pago (`POST /api/finance/payments`) — así en cada consulta de `overview` solo hace falta un fetch liviano del precio actual (cacheado 1h), sin recorrer 10 años de historial cada vez. Los pagos viejos que no tengan ese precio guardado (por ejemplo, cargados antes de este cambio) se completan automáticamente la primera vez que se pide `overview` (`backfillMissingSpyPrices`). Si Yahoo falla y no hay precio guardado ni actual disponible, cae a la tasa configurada como aproximación.
- **Cotización del dólar blue** (`src/app/api/finance/exchangeRate.js`, dolarapi.com, cache 5min, sin key) para mostrar el equivalente en pesos de "Total invertido" y "Valor estimado hoy".
- **Meses restantes de la casa** muestra también el equivalente en años entre paréntesis.

## 12. Notas de la implementación

- `npx next build` en el backend compiló sin errores con los 5 endpoints nuevos.
- No se pudo levantar el frontend en este entorno porque no tiene `node_modules` instalado (no se corrió `npm install` para no instalar dependencias sin permiso) — conviene probarlo manualmente con los pasos de la sección 11 antes de dar por cerrada la v1.
- Bull Market (sección 7) sigue sin implementar, como se planteó: la sección S&P500 es 100% de carga manual.
