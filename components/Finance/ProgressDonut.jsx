import React from 'react'

export const ProgressDonut = ({ percent, size = 220, strokeWidth = 22, label }) => {
  const clamped = Math.max(0, Math.min(percent, 1))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped)

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center px-4">
        <span className="text-3xl font-bold text-gray-800">{Math.round(clamped * 100)}%</span>
        {label && <span className="text-sm text-gray-500 mt-1">{label}</span>}
      </div>
    </div>
  )
}
