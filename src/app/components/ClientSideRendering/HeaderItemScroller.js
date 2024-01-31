"use client"

import { Context } from "@/app/Context/HeaderContext"
import { useContext } from "react"

const HeaderItemScroller = ({ children, index, className, onClick }) => {
	const { handleChangeIndexMobile } = useContext(Context)

  return (
    <div className={className} onClick={onClick == undefined ? () => handleChangeIndexMobile(index) : onClick}>{children}</div>
  )
}

export default HeaderItemScroller