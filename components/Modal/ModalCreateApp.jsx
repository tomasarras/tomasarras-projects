"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Modal from './Modal'
import { Input } from '../Form/Input/Input'
import { Textarea } from '../Form/Input/Textarea'
import { useEffect, useState } from 'react'

export default function ModalCreateApp({ onSubmit, token, setToken, ...props }) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')
  const [secretOtp, setSecretOtp] = useState('')
  const [fileAsBase64, setFileAsBase64] = useState(null)
  const [fileUploadPromise, setFileUploadPromise] = useState(null)

  const handleSelectFile = async (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileAsBase64(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const uploadFile = async () => {
    if (!fileAsBase64) return
    const body = {
      imgBase64: fileAsBase64
    }
    const url = process.env.NEXT_PUBLIC_AUTH_SERVER
    const response = await fetch(`${url}/api/auth/upload-img`, {
      method:'POST',
      headers: {
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(body)
    })
    const result = await response.json()
    setToken(result.newToken)
    return result.url
  }

  useEffect(() => {
    setFileUploadPromise(uploadFile())
  }, [fileAsBase64])
  

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    let img = null
    if (fileUploadPromise != null) {
      img = await fileUploadPromise
    }
    onSubmit({
      name,
      description: description === '' ? null : description,
      password,
      secretOtp: secretOtp === '' ? null : secretOtp,
      img,
    })
  }

  return <Modal size='3xl' {...props}>
    <div className="mx-auto sm:min-w-[400px]">
      <form onSubmit={handleOnSubmit}>
        <div className="mb-4 flex flex-col">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Description"
          />
        </div>

        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            Secret OTP
          </label>
          <Input
            value={secretOtp}
            onChange={(e) => setSecretOtp(e.target.value)}
            id="password2"
            type="text"
            placeholder="Secret"
          />
        </div>

        <div className="mb-4">
          <label className="items-start flex block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
            Icon (select image)
          </label>
          <input
            onChange={(e) => handleSelectFile(e.target.files[0])}
            id="file-upload"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gray-200 file:text-gray-700
                       hover:file:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </Modal>
}
