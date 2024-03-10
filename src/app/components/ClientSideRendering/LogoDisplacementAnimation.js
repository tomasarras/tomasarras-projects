"use client"

import { Context } from "@/app/Context/HeaderContext"
import { useContext } from "react"
import styles from "../Header/Header.module.css"

const LogoDisplacementAnimation = ({ children }) => {
	const { isActive } = useContext(Context)

  return (
    <div className={`${styles.logo} flex ${isActive && styles.visible}`}>{children}</div>
  )
}

export default LogoDisplacementAnimation