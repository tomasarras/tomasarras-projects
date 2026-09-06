# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Tomas Arras's personal portfolio site (tomasarras.com.ar), built with Next.js 14 (App Router), deployed presumably on Vercel. It's a single-page, full-screen-slide portfolio (Hero/About/Skills/Experience/Portfolio/Contact) with i18n (en/es), plus a hidden authenticator/2FA admin feature guarded by Telegram-based approval.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint (eslint-config-next)
```

There is no test suite configured in this repo.

To analyze the production bundle: `ANALYZE=true npm run build` (uses `@next/bundle-analyzer`, configured in `next.config.mjs`).

Postgres for local dev is provided via `docker-compose.yml` (`docker-compose up -d`), matching the `DATABASE_*` vars in `.env.example`.

## Architecture

### Routing & i18n

- App Router lives under `src/app/[locale]/...`, with locale routing handled by `next-intl`.
- `src/middleware.ts` is custom: it rewrites `/` to `/en` internally (URL stays `/`), rewrites any locale-less path to `/en/...` internally, and otherwise delegates to `next-intl`'s middleware for `/en` and `/es`. When adding new top-level routes, keep the middleware `matcher` config in sync.
- `src/i18n/request.ts` declares supported `locales` (`en`, `es`) and loads translations from `messages/{locale}.json`. Add new strings to both `messages/en.json` and `messages/es.json`.
- Path alias `@/*` maps to `./src/*` (see `jsconfig.json`).

### Portfolio page structure

- `src/app/[locale]/page.js` composes the whole one-page site out of `src/app/components/Pages/*` sections (Hero, About, Skills, Experience, Portfolio, Contact), each wrapped in `Container` and rendered inside `FullPage` (`src/app/components/Scroll/FullPage.js`) — a custom full-viewport slide/scroll engine (wheel/swipe driven via `react-scroll-wheel-handler` and `react-swipeable`, with its own eased-scroll animation logic).
- Global page state (current slide index, scroll position, cross-component subscriptions like `beforeUpdateCurrentPage`) is held in a single React context: `src/app/Context/index.js`. Components read/write this context instead of lifting state through props — check here first when tracing state-driven behavior (active slide, skills highlight, portfolio carousel index).
- Theme (dark/light) is handled by `src/app/providers/ThemeProvider.js` (`next-themes`), toggled via `Switch`/`Header` components.
- Constants (animation durations, Telegram callback action strings, etc.) live in both `src/app/Constants.js` and `src/app/constants/Constants.js` — check which one a given import path actually resolves before adding new constants; avoid introducing a third location.

### Authenticator / 2FA admin feature

A separate, password + Telegram-approval gated feature lives under `src/app/api/auth/*` for managing "authenticator apps" (OTP-style entries with images, stored passwords, secrets):

- **Login flow** (`src/app/api/auth/login/route.js`): validates `AUTH_PASSWORD` and per-IP attempt/ban tracking (`ip_list` table), then sends a Telegram message with inline Approve/Reject/Ban buttons (`sendLoginNotification` in `src/app/lib/telegramApi.js`) and polls the `login_2fa` table (via `retryUntilConditionOrTimeout`) until the operator approves/rejects via Telegram or it times out (60s). Approval issues a short-lived JWT (`newToken`, default 5m expiry) recorded in `authenticator_token` and bound to the requester's IP.
- **Telegram webhook** (`src/app/api/auth/webhook/telegram/route.js`): receives Telegram callback_query events and updates `login_2fa`/`ip_list` status based on the `APPROVE_TELEGRAM_ACTION` / `REJECT_TELEGRAM_ACTION` / `BAN_TELEGRAM_ACTION` prefix encoded in the callback data (`{action}_{id}`).
- **Token validation** (`isValidToken` in `src/app/api/utils.js`): every authenticated route re-validates + rotates the JWT (revokes old, issues new) and re-checks IP match — routes must forward the `newToken` in their response so the client can update its stored token.
- Tables are created lazily via `init()` in `src/app/api/utils.js` (`CREATE TABLE IF NOT EXISTS ...`) rather than migrations — there is no separate migration tool.
- DB access is a singleton `pg-promise` client (`db/index.js`, stored on `global` to survive hot reload / serverless re-invocation). Routes `require('.../db')` with relative paths rather than importing via `@/`.
- Passwords for stored authenticator apps are symmetrically encrypted with `crypto-js` AES using `ENCRYPT_PASSWORD` (`encryptPassword`/`decryptPassword` in `src/app/api/utils.js`), not hashed — this is intentional since the app needs to retrieve the plaintext OTP secret/password later.

### Other API routes

- `src/app/api/agent/route.js`: fire-and-forget endpoint that logs client device/browser telemetry (user agent, battery status) into a `portfolio` table; called from `src/app/Context/index.js` a few seconds after page load.
- CORS/OPTIONS handling for API routes goes through `getCorsHeaders()` in `src/utils/utils.js`; `ALLOWED_ORIGIN` env var controls the allowed origin, also referenced in `next.config.mjs` headers config.

### Config notes

- `next.config.mjs` wraps the config with `next-intl` and `@next/bundle-analyzer`, sets strict security headers (CSP, HSTS, X-Frame-Options, etc.) and a manual webpack `splitChunks` strategy (separate `framework`/`vendors`/`commons` chunks) — be careful changes here can affect both SEO/CSP and bundle size.
- `console.*` calls are stripped in production builds (`compiler.removeConsole`).
- Env vars are documented in `.env.example`: DB connection (`DATABASE_*`), auth (`AUTH_PASSWORD`, `JWT_SECRET`, `ENCRYPT_PASSWORD`, `TOKEN_EXPIRATION`), Telegram bot (`TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID_2FA`, `TELEGRAM_WEB_HOOK_URL`), CORS (`ALLOWED_ORIGIN`), and misc (`IMGBB_API_KEY`, `NEXT_PUBLIC_PRINT_URL`).
