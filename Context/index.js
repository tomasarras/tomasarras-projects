import React, { createContext, useEffect, useRef, useState } from "react";
import { getRequestAnimationFrame, easeInOutCirc } from "../utils/utils";
import { animationScrollDuration } from "../constants"

export const Context = createContext();

export const Provider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const hasPageBeenRendered = useRef({ effect: 2 })
    const [easeScroll, setEaseScroll] = useState(0)
    const prevCurrentPageRef = useRef(0);

    useEffect(() => {
        if (hasPageBeenRendered.current["effect"] == 0) {
            const prevValue = prevCurrentPageRef.current
            const startTime = performance.now();
            const startValue = 0;
            const offset = prevValue
            const direction = prevValue > currentPage ? -1 : 1
    
            function step(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < animationScrollDuration) {
                    let easedValue = easeInOutCirc(elapsedTime, startValue, 1, animationScrollDuration);
                    easedValue = easedValue * direction
                    setEaseScroll(easedValue+offset);
                    getRequestAnimationFrame()(step);
                } else {
                    setEaseScroll(direction+offset)
                }
            }
            getRequestAnimationFrame()(step);
        }
        if (hasPageBeenRendered.current["effect"] > 0)
            hasPageBeenRendered.current["effect"] = hasPageBeenRendered.current["effect"]-1
        prevCurrentPageRef.current = currentPage
    }, [currentPage])
    
    return (<Context.Provider value={{
        setCurrentPage,
        currentPage,
        easeScroll,
    }}>
        {children}
    </Context.Provider>);
}