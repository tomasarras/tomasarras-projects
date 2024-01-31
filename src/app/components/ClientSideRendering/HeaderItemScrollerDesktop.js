"use client"

import { Context } from "@/app/Context/index"
import { useContext } from "react"

const HeaderItemScrollerDesktop = ({ children, index }) => {
	const { setCurrentPage } = useContext(Context)

  return (
    <div className="w-full h-full flex items-center" onClick={() => setCurrentPage(index)}>{children}</div>
  )
}

export default HeaderItemScrollerDesktop