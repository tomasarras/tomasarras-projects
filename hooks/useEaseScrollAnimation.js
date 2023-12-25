import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { animationScrollDuration } from "../constants";
import { easeInOutCirc, getRequestAnimationFrame } from "../utils/utils";

export const useEaseScrollAnimation = () => {

    const { currentPage } = useContext(Context)
    const [value, setValue] = useState(0)
    
    useEffect(() => {
        const startTime = performance.now();
        const startValue = 0;

        function step(currentTime) {
            const elapsedTime = currentTime - startTime;

            if (elapsedTime < animationScrollDuration) {
                const easedValue = easeInOutCirc(elapsedTime, startValue, 1, animationScrollDuration);
                setValue(easedValue);
                getRequestAnimationFrame()(step);
            } else {
                setValue(1)
            }
        }
        getRequestAnimationFrame()(step);
    }, [currentPage])
    
    return value;
    
}