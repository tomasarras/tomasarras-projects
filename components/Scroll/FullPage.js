import React, { useState, useEffect, useContext, useRef } from 'react';
import s from './FullPage.module.css'
import Slider from '../Slider/Slider';
import { easeInOutCirc, getRequestAnimationFrame, isDesktop, isClient } from '../../utils/utils'
import { Context } from '../../Context';
//import { Lethargy } from 'lethargy'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Parallax from '../Parallax/Parallax';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

//const lethargy = new Lethargy()
export default function FullPage({ children, duration = 700 }) {
    const childrenArray = React.Children.toArray(children)
    const size = useWindowDimensions();
    const slidesCount = React.Children.count(children);
    const { setCurrentPage, currentPage, beforeUpdateCurrentPage } = useContext(Context)
    const [slides, setSlides] = useState([])
    const slidesRef = useRef([])
    const [isScrollPending, setIsScrollPending] = useState(false)
    const hasPageBeenRendered = useRef({ effect: false })
     
    const animatedScrollTo = (scrollTo, callback) => {
        const scrollFrom = window.scrollY || window.pageYOffset || 0;
        const scrollDiff = scrollTo - scrollFrom;
        const requestAnimationFrame = getRequestAnimationFrame()
        const animateScroll = () => {
            let isScrolling = false;

            function smoothScrollTo(newScrollPos, duration) {
                if (isScrolling) return;

                isScrolling = true;

                const startTime = performance.now();
                const startValue = window.scrollY || window.pageYOffset;
                const stopValue = newScrollPos - startValue                

                function step(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const easedValue = easeInOutCirc(elapsedTime, startValue, stopValue, duration);
                        window.scrollTo({ top: easedValue, behavior: 'instant' });
                        requestAnimationFrame(step);
                    } else {
                        window.scrollTo({ top: newScrollPos, behavior: 'smooth' });
                        isScrolling = false;
                        callback()
                    }
                }
                requestAnimationFrame(step);
            }
            smoothScrollTo(scrollFrom + scrollDiff, duration);
        }
        animateScroll() 
    }

    const updateSlides = () => {
        const slides = [];
        //TODO: aca parece que le asigna dinamicamente a cada slide el tamaño de la pantalla
        // esto puede que no sea bueno...
        for (let i = 0; i < slidesCount; i++) {
            slides.push(window.innerHeight * i);
        }
        setSlides(slides);
    }

    const scrollToSlide = (slide) => {
        if (slide >= 0 && slide < slidesCount) {      
            animatedScrollTo(slides[slide], () => {});
        }
    }

    const onScroll = (evt, direction) => {
        if (evt === undefined) return
        const scrollDown = direction == 'down'
        let newActiveSlide = scrollDown ? currentPage+1 : currentPage-1
        if (newActiveSlide == -1)
            newActiveSlide = 0
        else if (newActiveSlide == slidesCount)
          newActiveSlide = slidesCount -1
        setIsScrollPending(true)
        setTimeout(() => {
            setIsScrollPending(false)
        }, duration +100);
        const shouldContinue = beforeUpdateCurrentPage(evt, newActiveSlide)
        if (!shouldContinue) return
        setCurrentPage(newActiveSlide)
    }

    const onResize = () => updateSlides();

    useEffect(() => {
        window.addEventListener('resize', onResize);
    
        onResize();    
      return () => {
        document.removeEventListener('resize', onResize);
      }
    }, [currentPage, size])

    useEffect(() => {
        if (hasPageBeenRendered.current["effect"]) {
            scrollToSlide(currentPage);
        }
        hasPageBeenRendered.current["effect"] = true
    }, [currentPage])

    useEffect(() => {
        slidesRef.current.forEach(slide => {
            slide.firstChild.style.height = slide.getBoundingClientRect().height + "px"
        })
    }, [slidesRef, size])
    

    return (
    <ReactScrollWheelHandler
        upHandler={(e) => onScroll(e, 'up')}
        downHandler={(e) => onScroll(e, 'down')}
        pauseListeners={!isDesktop(size) || isScrollPending}
        preventScroll={isDesktop(size)}

    >
        {isDesktop(size) && <Slider slidesCount={slidesCount}/>}
        <Parallax/>
        {childrenArray.map((child, index) => (
            <div ref={el => slidesRef.current[index] = el} className={`${s.slide} overflow-x-hidden overflow-y-visible`} key={index}>
                <div>{child}</div>
            </div>
        ))}
    </ReactScrollWheelHandler>
    )
}

