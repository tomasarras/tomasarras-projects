"use client"

import { useContext } from "react"
import AnimationHandler from "../Utils/AnimationHandler"
import { Context } from "@/app/Context/HeaderContext"

export default function AnimatedMenuItem({ i, children, ignoreScroll = false }) {
  const { isSidebarOpen, handleChangeIndexMobile, toggleSidebar } = useContext(Context)
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      x: 200,
    },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
      }
    })
  }

  return <AnimationHandler className="as-text" onClick={() => ignoreScroll ? toggleSidebar() : handleChangeIndexMobile(i+1)} isAnimationEnabled variants={fadeInAnimationVariants} initial="initial" animate={isSidebarOpen ? "animate" : "initial"} custom={i}>{children}</AnimationHandler>
}