import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context";

export const useAnimationScroll = (targetIndex) => {
    const { currentPage } = useContext(Context)

    const animationVariant = {
        before: {
            opacity: .6,
            y: -400,
        },
        whileInView: {
            opacity: 1,
            y: 0,
        },
        passed: {
            opacity: .6,
            y: 400,
        },
    }
    const animation = {
        transition: { duration: .8, ease: 'easeOut' },
    }
    if (currentPage == targetIndex)
        animation.animate = animationVariant.whileInView
    else if(currentPage > targetIndex)
        animation.animate = animationVariant.before
    else
        animation.animate = animationVariant.passed
    return animation
}