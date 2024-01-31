"use client"

import { Context } from "@/app/Context/HeaderContext"
import { useContext } from "react"
import styles from "../Header/Header.module.css"

const HeaderLineDisplacement = () => {
	const { isActive, firstPagePassed } = useContext(Context)

  return (
    <div className={`${styles.borderContainer} ${isActive && styles.active} absolute w-full h-full`}>
      <div className={`${firstPagePassed && styles.black} w-full h-full ${styles.blur}`}></div>
    </div>
  )
}

export default HeaderLineDisplacement