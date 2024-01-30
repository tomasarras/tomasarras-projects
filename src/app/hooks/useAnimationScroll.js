import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { animationScrollDuration } from "../constants/Constants";

export const useAnimationScroll = (targetIndex, intensity) => {
    const { currentPage } = useContext(Context)
    //const size = useWindowDimensions()
    //TODO: check this animation
    //TODO: chek 170
    let y;
    if (currentPage == targetIndex)
        y = 0;
    else if (currentPage > targetIndex) {
        y = `${-170*intensity}vh`;
    } else if (currentPage < targetIndex) {
        y = `${170*intensity}vh`;
    }

    return {
        animate: { y },
        transition: { ease:"circInOut", duration: animationScrollDuration/1000 }
    }
}