import React, { useEffect, useState } from 'react'
import lockImage from '../../public/lock.png'
import Image from 'next/image'
import s from './auth.module.css'
import { AppsList } from '../../components/Apps/AppsList'

export default function Auth() { 
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [apps, setApps] = useState([])

  const handleOnKeyDown = async e => {
    if (e.key === 'Enter') {
      const body = { password }
      const url = process.env.NEXT_PUBLIC_AUTH_SERVER
      const response = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      const jsonResponse = await response.json()
      setToken(jsonResponse.token)
    }
  }

  const fetchApps = async () => {
    const url = process.env.NEXT_PUBLIC_AUTH_SERVER
    const response = await fetch(`${url}/api/auth/app`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    const responseJson = await response.json()
    setApps(responseJson.apps)    
  }

  useEffect(() => {
    if (token != null)
      fetchApps()
  }, [token])

  const handleDelete = (app) => {
    setApps(apps.filter(a => a.id !== app.id));
  };
  
  
  return !token 
    ? <div className={`${s.center} ${s.flex} ${s.screen}`}>
        <div className={s.logoAndInput}>
          <div className={s.centerX}>
            <Image className={s.logo}  src={lockImage} alt='lock'/>
          </div>
          <input type='password' className={s.input} value={password} onKeyDown={handleOnKeyDown} onChange={e => setPassword(e.target.value)} />
        </div>
      </div>
    : <AppsList apps={apps} onDelete={handleDelete}/>
  
}
