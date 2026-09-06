import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { formatDate, formatArs, formatUsd } from './format'

export const PaymentsTable = ({ payments, onDelete }) => {
  if (!payments.length) {
    return <p className="text-sm text-gray-500 text-center py-8">Todavía no cargaste ningún pago.</p>
  }
  return (
    <div className="overflow-x-auto bg-white rounded shadow-md">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 px-4">Fecha</th>
            <th className="py-2 px-4">ARS</th>
            <th className="py-2 px-4">USD</th>
            <th className="py-2 px-4">Cotización</th>
            <th className="py-2 px-4">Nota</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="py-2 px-4 whitespace-nowrap">{formatDate(p.payment_date)}</td>
              <td className="py-2 px-4 whitespace-nowrap">{formatArs(p.amount_ars)}</td>
              <td className="py-2 px-4 whitespace-nowrap">{formatUsd(p.amount_usd)}</td>
              <td className="py-2 px-4 whitespace-nowrap text-gray-500">{formatArs(p.amount_ars / p.amount_usd)}</td>
              <td className="py-2 px-4 text-gray-500">{p.note || '-'}</td>
              <td className="py-2 px-4">
                <button onClick={() => onDelete(p)} className="text-red-500 hover:text-red-700 p-1">
                  <FaTrash size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
