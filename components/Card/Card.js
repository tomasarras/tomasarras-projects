import React from 'react'
import styles from './Card.module.css'

export const Card = ({ children, className }) => {
  return (
    <div className={`${styles.card} rounded p-4 ${className}`}>{children}</div>
  )
}
