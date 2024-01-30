"use client"
import AnimationHandler from "./AnimationHandler"
import { isDesktop } from "@/app/utils/utils"
import useWindowDimensions from "@/app/hooks/useWindowDimensions"

export default function OnlyDesktopAnimation({ children, ...props }) {
    const size = useWindowDimensions()

    return <AnimationHandler isAnimationEnabled={isDesktop(size)} {...props}>{children}</AnimationHandler>

}