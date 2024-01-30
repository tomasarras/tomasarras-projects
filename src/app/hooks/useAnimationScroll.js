import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { animationScrollDuration } from "../constants/Constants";
import useWindowDimensions from "./useWindowDimensions";

export const useAnimationScroll = (targetIndex) => {
    const { currentPage } = useContext(Context)
    //const size = useWindowDimensions()
    //TODO: check this animation
    let y;
    if (currentPage == targetIndex)
        y = 0;
    else if (currentPage > targetIndex) {
        y = "-100vh";
    } else if (currentPage < targetIndex) {
        y = "100vh";
    }

    return {
        animate: { y },
        transition: { ease:"circInOut", duration: animationScrollDuration/1000 }
    }
}