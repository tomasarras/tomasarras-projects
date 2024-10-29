import React from 'react'
import s from './Input.module.css'

export const Input = (props) => {
  return <input {...props} className={s.input} />
}
