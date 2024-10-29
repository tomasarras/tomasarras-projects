import React, { useEffect, useState } from 'react'
import lockImage from '../../public/lock.png'
import Image from 'next/image'
import s from './auth.module.css'
import { AppsList } from '../../components/Apps/AppsList'
import { Search } from '../../components/Search/Search'
import { PlusButton } from '../../components/Buttons/SidebarButton/PlusButton'
import ModalCreateApp from '../../components/Modal/ModalCreateApp'
import { Input } from '../../components/Form/Input/Input'
import axios from '../../axios/axiosInstance'
import { AlertTimer } from '../../components/Alert/AlertTimer'

export default function Auth() { 
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [allApps, setAllApps] = useState([])
  const [filteredApps, setFilteredApps] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const filtered = allApps.filter(app => 
      app.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredApps(filtered)
  }, [searchValue, allApps])

  const createApp = async (app, token) => {
    const response = await axios.post(`/api/auth/new-app`, app, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = response.data
    const newApp = data.createdApp
    setToken(data.newToken)
    setAllApps(prevApps => [...prevApps, newApp])
    setIsModalOpen(false)
  }

  const handleOnKeyDown = async e => {
    if (e.key === 'Enter') {
      const body = { password }
      try {
        const response = await axios.post(`/api/auth/login`, body)
        const jsonResponse = response.data        
        setToken(jsonResponse.token)
        fetchApps(jsonResponse.token)
      } catch (e) {
        //TODO
      }
    }
  }

  const fetchApps = async (token) => {
    const response = await axios.get(`/api/auth/app`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    const responseJson = await response.data
    setToken(responseJson.newToken)
    setAllApps(responseJson.apps)
  }

  const handleDelete = async (app) => {
    const response = await axios.delete(`/api/auth/app/${app.id}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    setToken(response.data.newToken)
    setAllApps(prevApps => prevApps.filter(a => a.id !== app.id))
  }
  
  const copyPassword = async (app) => {
    try {
      const response = await axios.get(`/api/auth/app/${app.id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      setToken(response.data.newToken)
      const password = response.data.app.password
      await navigator.clipboard.writeText(password)
      setNotification('Copied!')
      setTimeout(() => setNotification(''), 3000)
    } catch (error) {
      console.error('Error al copiar la contraseña:', error)
    }
  }
  
  return !token 
    ? <div className={`${s.center} ${s.flex} ${s.screen}`}>
        <div className={s.logoAndInput}>
          <div className={s.centerX}>
            <Image className={s.logo}  src={lockImage} alt='lock'/>
          </div>
          <Input type='password' value={password} onKeyDown={handleOnKeyDown} onChange={e => setPassword(e.target.value)} />
        </div>
      </div>
    : <div className="max-w-[800px] mx-auto w-full">
        {notification && <AlertTimer notification={notification}/>}
        <div className='mt-8 mb-4'>
          <Search value={searchValue} onChange={setSearchValue}/>
        </div>
        <AppsList apps={filteredApps} onDelete={handleDelete} onClickOnApp={copyPassword}/>
        <PlusButton onClick={() => setIsModalOpen(true)}/>
        <ModalCreateApp 
          token={token}
          setToken={setToken}
          isOpen={isModalOpen} 
          close={() => setIsModalOpen(false)} 
          title={'New App'}
          onSubmit={createApp}
        />
      </div>
  
}
