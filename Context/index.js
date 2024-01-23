import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { getRequestAnimationFrame, easeInOutCirc } from "../utils/utils";
import { animationScrollDuration } from "../constants/Constants"

export const Context = createContext();

export const Provider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const hasPageBeenRendered = useRef({ effect: 2 })
    const [easeScroll, setEaseScroll] = useState(0)
    const prevCurrentPageRef = useRef(0);
    const [beforeUpdateCurrentPageSubscriptors, setBeforeUpdateCurrentPageSubscriptors] = useState({})

    const subscribeBeforeCurrentPageUpdated = (key, func) => {
        console.log(key,"AKK");
        setBeforeUpdateCurrentPageSubscriptors((prev) => prev[key] = func)
    }

    const beforeUpdateCurrentPage = useCallback(
      (evt, newCurrentPage) => {
        for (const key in beforeUpdateCurrentPageSubscriptors) {
            if (beforeUpdateCurrentPageSubscriptors.hasOwnProperty(key)) {
              const func = beforeUpdateCurrentPageSubscriptors[key];
              if (func(evt, newCurrentPage) === false)
                return false
            }
        }
        return true
      },
      [beforeUpdateCurrentPageSubscriptors],
    )

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ beforeUpdateCurrentPageSubscriptors:", beforeUpdateCurrentPageSubscriptors)
    }, [beforeUpdateCurrentPageSubscriptors])
    
    

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

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            setScrollY(scrollY)
            // Puedes ajustar estos valores según tus necesidades
            // const element = containerRef.current; 
            // const elementTop = element.getBoundingClientRect().top + scrollY;
            // const elementBottom = elementTop + element.clientHeight;

            // Verifica si el elemento está en la pantalla
            //setIsActive(scrollY >= elementTop && scrollY <= elementBottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (<Context.Provider value={{
        setCurrentPage,
        currentPage,
        easeScroll,
        scrollY,
        setScrollY,
        beforeUpdateCurrentPage,
        subscribeBeforeCurrentPageUpdated,
    }}>
        {children}
    </Context.Provider>);
}