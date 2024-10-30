import React from 'react'
import { FaTrash, FaPlus } from 'react-icons/fa';

export const PlusButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600">
      <FaPlus size={20} />
    </button>
  )
}
