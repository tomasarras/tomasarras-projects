"use client"
import AnimationHandler from "./AnimationHandler"

export default function DevIconAnimation({ children, className, index }) {
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
			isAnimationEnabled
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