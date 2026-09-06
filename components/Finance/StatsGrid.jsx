import React from 'react'

export const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map(({ label, value, sub }) => (
        <div key={label} className="bg-white rounded shadow-md p-4">
          <p className="text-sm text-gray-500">{label}</p>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1">
            <p className="text-lg font-semibold text-gray-800">{value}</p>
            {sub && <span className="text-xs font-normal text-gray-400">{sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
