"use client"

import { Context } from "@/app/Context/HeaderContext"
import { useContext } from "react"

const HeaderSidebarToggler = ({ children }) => {
	const { toggleSidebar } = useContext(Context)

  return (
    <div onClick={toggleSidebar}>{children}</div>
  )
}

export default HeaderSidebarToggler