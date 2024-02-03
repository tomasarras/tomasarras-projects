"use client"
import { isDesktop } from '@/app/utils/utils'
import AnimationHandler from '../Utils/AnimationHandler'
import useWindowDimensions from '@/app/hooks/useWindowDimensions'

export const AnimatedExperienceTimelineItem = ({ index, children }) => {
  const size = useWindowDimensions()
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
			isAnimationEnabled={isDesktop(size)}
			variants={fadeInAnimationVariants}
			initial="initial"
			whileInView="animate"
			custom={index}
		>
			{children}
		</AnimationHandler>
  )
}