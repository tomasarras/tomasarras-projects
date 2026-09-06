import React, { useEffect, useState } from 'react'
import { FaLock, FaCog } from 'react-icons/fa'
import axios from '../../axios/axiosInstance'
import { Input } from '../../components/Form/Input/Input'
import { Loader } from '../../components/Loader/Loader'
import { PlusButton } from '../../components/Buttons/SidebarButton/PlusButton'
import { ProgressDonut } from '../../components/Finance/ProgressDonut'
import { StatsGrid } from '../../components/Finance/StatsGrid'
import { PaymentsTable } from '../../components/Finance/PaymentsTable'
import ModalAddPayment from '../../components/Finance/ModalAddPayment'
import ModalSettings from '../../components/Finance/ModalSettings'
import { formatUsd, formatArs } from '../../components/Finance/format'

const TOKEN_KEY = 'financeToken'

const RETURN_PRESETS = [5, 10]

export default function Finanzas() {
  const [token, setToken] = useState(null)
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoadingOverview, setIsLoadingOverview] = useState(false)
  const [overview, setOverview] = useState(null)
  const [activeTab, setActiveTab] = useState('house')
  const [sp500ReturnOverride, setSp500ReturnOverride] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      setToken(stored)
      fetchOverview(stored)
    }
  }, [])

  const fetchOverview = async (tok, returnPctOverride) => {
    setIsLoadingOverview(true)
    try {
      const response = await axios.get(`/api/finance/overview`, {
        headers: { Authorization: 'Bearer ' + tok },
        params: returnPctOverride != null ? { sp500ReturnPct: returnPctOverride } : {},
      })
      setOverview(response.data)
    } catch (e) {
      if (e?.response?.status === 401) logout()
    } finally {
      setIsLoadingOverview(false)
    }
  }

  const handleLogin = async (e) => {
    if (e.key !== 'Enter') return
    setIsLoggingIn(true)
    try {
      const response = await axios.post(`/api/finance/login`, { password })
      const tok = response.data.token
      localStorage.setItem(TOKEN_KEY, tok)
      setToken(tok)
      await fetchOverview(tok)
    } catch (e) {
      // password incorrecto: no hacemos nada, se puede reintentar
    } finally {
      setIsLoggingIn(false)
      setPassword('')
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setOverview(null)
  }

  const addPayment = async (payment) => {
    await axios.post(
      `/api/finance/payments`,
      { category: activeTab, ...payment },
      { headers: { Authorization: 'Bearer ' + token } }
    )
    setIsAddModalOpen(false)
    await fetchOverview(token, activeTab === 'sp500' ? sp500ReturnOverride : undefined)
  }

  const deletePayment = async (payment) => {
    await axios.delete(`/api/finance/payments/${payment.id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    await fetchOverview(token, activeTab === 'sp500' ? sp500ReturnOverride : undefined)
  }

  const updateSettings = async (partial) => {
    await axios.put(`/api/finance/settings`, partial, {
      headers: { Authorization: 'Bearer ' + token },
    })
    await fetchOverview(token, activeTab === 'sp500' ? sp500ReturnOverride : undefined)
  }

  const changeReturnOverride = (pct) => {
    setSp500ReturnOverride(pct)
    fetchOverview(token, pct)
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <FaLock size={48} className="text-gray-400 mb-6" />
          {isLoggingIn ? (
            <Loader />
          ) : (
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleLogin}
              autoFocus
            />
          )}
        </div>
      </div>
    )
  }

  if (!overview) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader />
      </div>
    )
  }

  const { house, sp500 } = overview

  const houseStats = [
    { label: 'Pagado', value: formatUsd(house.totalPaidUsd) },
    { label: 'Falta pagar', value: formatUsd(house.remainingUsd) },
    { label: 'Meta total', value: formatUsd(house.houseGoalUsd) },
    { label: 'Cuota mensual', value: formatUsd(house.monthlyTargetUsd) },
    {
      label: 'Meses restantes',
      value: house.monthsRemaining ?? '-',
      sub: house.monthsRemaining != null
        ? `(${(house.monthsRemaining / 12).toLocaleString('es-AR', { maximumFractionDigits: 1 })} años)`
        : undefined,
    },
    { label: 'Pagos realizados', value: house.paymentsCount },
  ]

  const yearsToRetirement = (sp500.monthsToRetirement / 12).toFixed(1)

  const sp500Stats = [
    {
      label: 'Total invertido',
      value: formatUsd(sp500.totalInvestedUsd),
      sub: overview.usdArsRate ? formatArs(sp500.totalInvestedUsd * overview.usdArsRate) : undefined,
    },
    {
      label: 'Valor estimado hoy',
      value: formatUsd(sp500.currentValueUsd),
      sub: overview.usdArsRate ? formatArs(sp500.currentValueUsd * overview.usdArsRate) : undefined,
    },
    { label: 'Edad actual', value: `${sp500.currentAgeYears.toFixed(1)} años` },
    { label: 'Años hasta el retiro', value: yearsToRetirement },
    { label: 'Aporte mensual', value: formatUsd(sp500.monthlyTargetUsd) },
    { label: 'Dinero de retiro', value: formatUsd(sp500.projectedRetirementFundUsd) },
    { label: 'Dinero mensual de retiro', value: formatUsd(sp500.projectedMonthlyIncomeUsd) },
    { label: 'Meta mensual de retiro', value: formatUsd(sp500.retirementGoalMonthlyUsd) },
    { label: '% de la meta', value: `${Math.round(sp500.goalProgressPct * 100)}%` },
    { label: 'Aportes realizados', value: sp500.paymentsCount },
  ]

  return (
    <div className="max-w-[900px] mx-auto w-full px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('house')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'house' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Casa
          </button>
          <button
            onClick={() => setActiveTab('sp500')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'sp500' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            S&P500
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsSettingsModalOpen(true)} className="p-2 text-gray-500 hover:text-gray-700">
            <FaCog size={18} />
          </button>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
            Salir
          </button>
        </div>
      </div>

      {isLoadingOverview && <Loader />}

      {!isLoadingOverview && activeTab === 'house' && (
        <div>
          <div className="flex justify-center mb-6">
            <ProgressDonut percent={house.progressPct} label="pagado" />
          </div>
          <StatsGrid stats={houseStats} />
          <div className="mt-6">
            <PaymentsTable payments={house.payments} onDelete={deletePayment} />
          </div>
        </div>
      )}

      {!isLoadingOverview && activeTab === 'sp500' && (
        <div>
          <div className="flex justify-center gap-2 mb-6">
            {RETURN_PRESETS.map((pct) => (
              <button
                key={pct}
                onClick={() => changeReturnOverride(pct)}
                className={`px-3 py-1 rounded text-sm font-semibold ${sp500.annualReturnPct === pct ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Ver con {pct}%
              </button>
            ))}
          </div>
          <StatsGrid stats={sp500Stats} />
          <div className="mt-6">
            <PaymentsTable payments={sp500.payments} onDelete={deletePayment} />
          </div>
        </div>
      )}

      <PlusButton onClick={() => setIsAddModalOpen(true)} />

      <ModalAddPayment
        isOpen={isAddModalOpen}
        close={() => setIsAddModalOpen(false)}
        onSubmit={addPayment}
        title={activeTab === 'house' ? 'Nuevo pago de la casa' : 'Nuevo aporte a S&P500'}
      />

      <ModalSettings
        isOpen={isSettingsModalOpen}
        close={() => setIsSettingsModalOpen(false)}
        onSubmit={updateSettings}
        title="Configuración"
        values={{
          houseGoalUsd: overview.settings.house_goal_usd,
          houseMonthlyTargetUsd: overview.settings.house_monthly_target_usd,
          sp500MonthlyTargetUsd: overview.settings.sp500_monthly_target_usd,
          sp500AnnualReturnPct: overview.settings.sp500_annual_return_pct,
          sp500RetirementGoalMonthlyUsd: overview.settings.sp500_retirement_goal_monthly_usd,
        }}
        fields={
          activeTab === 'house'
            ? [
                { key: 'houseGoalUsd', label: 'Meta total de la casa (USD)' },
                { key: 'houseMonthlyTargetUsd', label: 'Cuota mensual (USD)' },
              ]
            : [
                { key: 'sp500MonthlyTargetUsd', label: 'Aporte mensual (USD)' },
                { key: 'sp500AnnualReturnPct', label: 'Rendimiento anual estimado (%)' },
                { key: 'sp500RetirementGoalMonthlyUsd', label: 'Meta mensual de retiro (USD)' },
              ]
        }
      />
    </div>
  )
}
