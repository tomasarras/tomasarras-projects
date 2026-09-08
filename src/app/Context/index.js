"use client"
import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { getRequestAnimationFrame, easeInOutCirc } from "../utils/utils";
import { animationScrollDuration, sectionSlugs } from "../constants/Constants"

export const Context = createContext();

export const Provider = ({ children, locale }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [skillsHighlightedType, setSkillsHighlightedType] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const hasPageBeenRendered = useRef({ effect: 2 })
    const [easeScroll, setEaseScroll] = useState(0)
    const [portfolioIndex, setPortfolioIndex] = useState(0)
    const prevCurrentPageRef = useRef(0);
    const [beforeUpdateCurrentPageSubscriptors, setBeforeUpdateCurrentPageSubscriptors] = useState({})
    const isFirstHashSync = useRef(true)

    const subscribeBeforeCurrentPageUpdated = (key, func) => {
        const newState = Object.assign({}, beforeUpdateCurrentPageSubscriptors)
        newState[key] = func
        setBeforeUpdateCurrentPageSubscriptors(newState)
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
        };
        try {
            if (window.printLoaded == undefined) {
                window.printLoaded = "loaded"
                setTimeout(async () => {
                    const ua = window?.navigator?.userAgent
                    const data = {
                        ua
                    }
                    const hasBattery = "getBattery" in navigator
                    if (hasBattery) {
                        const battery = await navigator.getBattery()
                        data.charging = battery.charging
                        data.chargingTime = battery.chargingTime
                        data.dischargingTime = battery.dischargingTime
                        data.level = battery.level
                    }
                    fetch(`${process.env.NEXT_PUBLIC_PRINT_URL}/agent`, {
                        method: "POST",
                        body: JSON.stringify(data)
                    })
                }, 5000);
            }
        } catch {}

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '')
        const index = sectionSlugs.indexOf(hash)
        if (index > 0)
            setCurrentPage(index)
    }, []);

    useEffect(() => {
        if (isFirstHashSync.current) {
            isFirstHashSync.current = false
            return
        }
        const slug = sectionSlugs[currentPage]
        const url = `${window.location.pathname}${window.location.search}${slug ? `#${slug}` : ''}`
        window.history.replaceState(null, '', url)
    }, [currentPage]);

    return (<Context.Provider value={{
        setCurrentPage,
        currentPage,
        easeScroll,
        scrollY,
        setScrollY,
        beforeUpdateCurrentPage,
        subscribeBeforeCurrentPageUpdated,
        portfolioIndex,
        setPortfolioIndex,
        skillsHighlightedType,
        setSkillsHighlightedType,
        locale,
    }}>
        {children}
    </Context.Provider>);
}