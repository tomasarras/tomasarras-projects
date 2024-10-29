import React from 'react'
import { Input } from '../Form/Input/Input'

export const Search = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 mb-4 border border-gray-300 rounded"
    />
  )
}
