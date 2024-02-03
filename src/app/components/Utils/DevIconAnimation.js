"use client"
import { isDesktop } from "@/app/utils/utils"
import AnimationHandler from "./AnimationHandler"
import useWindowDimensions from "@/app/hooks/useWindowDimensions"

export default function DevIconAnimation({ children, className, index }) {
	const size = useWindowDimensions()
    const fadeInAnimationVariants = {
			initial: {
				opacity: 0,
				y: 100,
			},
			animate: (index) => ({
				opacity: 1,
				y: 0,
				transition: {
					delay: 0.05 * index,
				}
			})
    }

    return (
		<AnimationHandler
			isAnimationEnabled={isDesktop(size)}
			className={className}
			variants={fadeInAnimationVariants}
			initial="initial"
			whileInView="animate"
			custom={index}
		>
			{children}
		</AnimationHandler>
		)

}