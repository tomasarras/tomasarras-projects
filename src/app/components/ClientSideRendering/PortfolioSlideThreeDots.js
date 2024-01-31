"use client"

import { Context } from "@/app/Context/index"
import { useContext } from "react"
import OnlyDesktopAnimation from "../Utils/OnlyDesktopAnimation"
import { animationScrollDuration } from "@/app/Constants"
import styles from "../Pages/Portfolio/Slides/PortfolioSlideThree.module.css"

const PortfolioSlideThreeDots = () => {
	const { portfolioIndex } = useContext(Context)

  const backgroundVariant = {
    initial: {
      x: "30vw"
    },
    animate: {
      x:0
    }
  }

  return (
    <OnlyDesktopAnimation
      variants={backgroundVariant}
      animate={portfolioIndex == 2 ? "animate" : "initial"}
      transition={{duration: (animationScrollDuration/1000) + 0.1}}
      className={`${styles.laptopDots}`}
    />
  )
}

export default PortfolioSlideThreeDots