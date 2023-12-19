import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context";

export const useAnimationScroll = (targetIndex) => {
    const { currentPage } = useContext(Context)

    const animationVariant = {
        before: {
            opacity: .6,
            y: -100,
        },
        whileInView: {
            opacity: 1,
            y: 0,
        },
        passed: {
            opacity: .6,
            y: 100,
        },
    }
    const animation = {
        transition: { duration: .5, ease: 'easeOut' },
    }
    if (currentPage == targetIndex)
        animation.animation = animationVariant.whileInView
    else if(currentPage > targetIndex)
        animation.animation = animationVariant.passed
    else
        animation.animation = animationVariant.before
    return animation
}