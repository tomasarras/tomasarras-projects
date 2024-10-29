import React from 'react'

export const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 mb-4 border border-gray-300 rounded"
    />
  )
}
