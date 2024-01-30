"use client"
import AnimationHandler from '../Utils/AnimationHandler'

export const AnimatedExperienceTimelineItem = ({ index, children }) => {
	const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
      }
    })
  }

  return (
    <AnimationHandler
			isAnimationEnabled
			variants={fadeInAnimationVariants}
			initial="initial"
			whileInView="animate"
			custom={index}
		>
			{children}
		</AnimationHandler>
  )
}