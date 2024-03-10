"use client"

import { Context } from "@/app/Context/index"
import { useContext, useEffect } from "react"
import HeaderItemScroller from "./HeaderItemScroller"
import styles from "../Header/Header.module.css"

const HeaderLiDesktopColor = ({ children, index }) => {
  const { currentPage, setCurrentPage } = useContext(Context);


  return (
    <HeaderItemScroller className={`${currentPage == index ? styles.isActive : "as-text"} ${styles.li}`} index={index} onClick={() => setCurrentPage(index)}>{children}</HeaderItemScroller>
  )
}

export default HeaderLiDesktopColor