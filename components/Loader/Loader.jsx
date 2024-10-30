import React from 'react'
import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}
