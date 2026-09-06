export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('es-AR', { timeZone: 'UTC' })

export const formatArs = (n) =>
  `$${Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`

export const formatUsd = (n) =>
  `US$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export const formatPct = (n) =>
  `${(Number(n) * 100).toLocaleString('es-AR', { maximumFractionDigits: 1 })}%`
