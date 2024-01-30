"use client"
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import AnimationHandler from './AnimationHandler'
import { isDesktop } from '@/app/utils/utils'
import { useAnimationScroll } from '@/app/hooks/useAnimationScroll'

const ScrollWhileInViewAnimation = ({ page, intensity = 1, children, ...props }) => {
	const scrollAnimation = useAnimationScroll(page, intensity)
	const size = useWindowDimensions()

  return (
    <AnimationHandler {...props} {...scrollAnimation} isAnimationEnabled={isDesktop(size)}>{children}</AnimationHandler>
  )
}

export default ScrollWhileInViewAnimation