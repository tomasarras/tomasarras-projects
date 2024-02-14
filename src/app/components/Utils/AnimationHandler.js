"use client"
import { motion } from "framer-motion"

export default function AnimationHandler({ isAnimationEnabled, whileInView, ...props }) {

    return isAnimationEnabled ? 
    <motion.div whileInView={whileInView} {...props}>{props.children}</motion.div>
    :
    <div {...props}>{props.children}</div>
}