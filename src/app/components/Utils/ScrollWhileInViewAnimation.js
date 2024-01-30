"use client"
import useWindowDimensions from '@/app/hooks/useWindowDimensions'
import AnimationHandler from './AnimationHandler'
import { isDesktop } from '@/app/utils/utils'

const ScrollWhileInViewAnimation = ({ page, children, ...props }) => {
	const scrollAnimation = useAnimationScroll(page)
	const size = useWindowDimensions()

  return (
    <AnimationHandler {...props} {...scrollAnimation} isAnimationEnabled={isDesktop(size)}>{children}</AnimationHandler>
  )
}

export default ScrollWhileInViewAnimation