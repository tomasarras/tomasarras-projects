"use client"

import { Context } from "@/app/Context/HeaderContext"
import { useContext } from "react"
import styles from "../Header/Header.module.css"

const HeaderDisplacementAnimation = ({ children }) => {
	const { isActive } = useContext(Context)

  return (
    <div className={`${styles.desktopNav} ${isActive && styles.visible}`}>{children}</div>
  )
}

export default HeaderDisplacementAnimation