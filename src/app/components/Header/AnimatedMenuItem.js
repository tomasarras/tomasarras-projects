"use client"

import AnimationHandler from "../Utils/AnimationHandler"

export default function AnimatedMenuItem({ isOpen, i, children }) {
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

  return <AnimationHandler isAnimationEnabled variants={fadeInAnimationVariants} initial="initial" animate={isOpen ? "animate" : "initial"} custom={i}>{children}</AnimationHandler>
}