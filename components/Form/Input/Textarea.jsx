import React from 'react'
import s from './Input.module.css'

export const Textarea = (props) => {
  return <textarea {...props} className={s.input} />
}
