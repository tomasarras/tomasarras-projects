"use client"

import Modal from '../Modal/Modal'
import { Input } from '../Form/Input/Input'
import { useState } from 'react'

const todayIso = () => new Date().toISOString().slice(0, 10)

export default function ModalAddPayment({ isOpen, close, onSubmit, title }) {
  const [paymentDate, setPaymentDate] = useState(todayIso())
  const [amountArs, setAmountArs] = useState('')
  const [amountUsd, setAmountUsd] = useState('')
  const [note, setNote] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    await onSubmit({
      paymentDate,
      amountArs: parseFloat(amountArs),
      amountUsd: parseFloat(amountUsd),
      note: note || null,
    })
    setIsSaving(false)
    setAmountArs('')
    setAmountUsd('')
    setNote('')
    setPaymentDate(todayIso())
  }

  return (
    <Modal isOpen={isOpen} close={close} title={title}>
      <form onSubmit={handleSubmit} className="mx-auto sm:min-w-[360px]">
        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentDate">
            Fecha
          </label>
          <Input id="paymentDate" type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="amountArs">
            Monto (ARS)
          </label>
          <Input id="amountArs" type="number" step="0.01" value={amountArs} onChange={(e) => setAmountArs(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="amountUsd">
            Monto (USD)
          </label>
          <Input id="amountUsd" type="number" step="0.01" value={amountUsd} onChange={(e) => setAmountUsd(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
            Nota (opcional)
          </label>
          <Input id="note" type="text" placeholder="ej: le pasé a Adri" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSaving ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </Modal>
  )
}
