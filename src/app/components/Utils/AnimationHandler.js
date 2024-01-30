"use client"
import { motion } from "framer-motion"

export default function AnimationHandler({ isAnimationEnabled, ...props }) {

    return isAnimationEnabled ? 
    <motion.div {...props}>{props.children}</motion.div>
    :
    <div {...props}>{props.children}</div>
}