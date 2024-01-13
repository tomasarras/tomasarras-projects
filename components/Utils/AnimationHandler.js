import { motion } from "framer-motion"

export default function AnimationHandler(props) {

    return props.isAnimationEnabled ? 
    <motion.div {...props}>{props.children}</motion.div>
    :
    <div {...props}>{props.children}</div>
}