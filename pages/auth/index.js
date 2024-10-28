import React, { useState } from 'react'
import lockImage from '../../public/lock.png'
import Image from 'next/image'
import s from './auth.module.css'

export default function Auth() { 
  const [password, setPassword] = useState('')

  const handleOnKeyDown = async e => {
    if (e.key === 'Enter') {
      const body = { password }
      const url = process.env.NEXT_PUBLIC_AUTH_SERVER
      const response = await fetch(`${url}/api/auth`, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      console.log(response);
    }
  }
  
  return <div className={`${s.center} ${s.flex} ${s.screen}`}>
    <div className={s.logoAndInput}>
      <div className={s.centerX}>
        <Image className={s.logo}  src={lockImage} alt='lock'/>
      </div>
      <input type='password' className={s.input} value={password} onKeyDown={handleOnKeyDown} onChange={e => setPassword(e.target.value)} />
    </div>
  </div>
}
