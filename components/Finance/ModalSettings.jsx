"use client"

import Modal from '../Modal/Modal'
import { Input } from '../Form/Input/Input'
import { useState, useEffect } from 'react'

export default function ModalSettings({ isOpen, close, title, fields, values, onSubmit }) {
  const [form, setForm] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen) setForm(values)
  }, [isOpen, values])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    await onSubmit(form)
    setIsSaving(false)
    close()
  }

  return (
    <Modal isOpen={isOpen} close={close} title={title}>
      <form onSubmit={handleSubmit} className="mx-auto sm:min-w-[360px]">
        {fields.map((f) => (
          <div className="mb-4" key={f.key}>
            <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor={f.key}>
              {f.label}
            </label>
            <Input
              id={f.key}
              type="number"
              step={f.step || '0.01'}
              value={form[f.key] ?? ''}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              required
            />
          </div>
        ))}
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
