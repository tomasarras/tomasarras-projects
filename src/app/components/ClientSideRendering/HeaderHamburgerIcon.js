"use client"

import { useContext } from 'react'
import { HamburgerIcon } from '../Icons/HamburgerIcon'
import { Context } from '@/app/Context/HeaderContext'

const HeaderHamburgerIcon = () => {

	const { isSidebarOpen } = useContext(Context)
  return (
    <HamburgerIcon width={32} height={24} isOpen={isSidebarOpen} transition={{ ease: "easeOut", duration: 0.2 }} strokeWidth="2"/>
  )
}

export default HeaderHamburgerIcon