import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { animationScrollDuration } from "../constants/Constants";
import useWindowDimensions from "./useWindowDimensions";

export const useAnimationScroll = (targetIndex) => {
    const { currentPage } = useContext(Context)
    const size = useWindowDimensions()
    let y;
    if (currentPage == targetIndex)
        y = 0;
    else if (currentPage > targetIndex) {
        y = -size.height;
    } else if (currentPage < targetIndex) {
        y = size.height;
    }

    return {
        animate: { y },
        transition: { ease:"circInOut", duration: animationScrollDuration/1000 }
    }
}