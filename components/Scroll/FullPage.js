import React, { useState, useEffect, useContext, useRef } from 'react';
import s from './FullPage.module.css'
import Slider from '../Slider/Slider';
import { easeInOutCirc, getRequestAnimationFrame, isMobileDevice } from '../../utils/utils'
import { Context } from '../../Context';
import { Lethargy } from 'lethargy'

const lethargy = new Lethargy()
export default function FullPage({ children, duration = 700 }) {
    const childrenArray = React.Children.toArray(children)
    const slidesCount = React.Children.count(children);
    const { setCurrentPage, currentPage } = useContext(Context)
    const [slides, setSlides] = useState([])
    const isScrollPending = useRef(false)
    const hasPageBeenRendered = useRef({ effect: false })
     
    const animatedScrollTo = (scrollTo, callback) => {
        const scrollFrom = window.scrollY || window.pageYOffset || 0;
        const scrollDiff = scrollTo - scrollFrom;
        
        const animateScroll = () => {
            let isScrolling = false;

            function smoothScrollTo(newScrollPos, duration) {
                if (isScrolling) return;

                isScrolling = true;

                const startTime = performance.now();
                const startValue = window.scrollY || window.pageYOffset;

                function step(currentTime) {
                    const elapsedTime = currentTime - startTime;

                    if (elapsedTime < duration) {
                        const easedValue = easeInOutCirc(elapsedTime, startValue, newScrollPos - startValue, duration);
                        window.scrollTo({ top: easedValue, behavior: 'instant' });
                        getRequestAnimationFrame()(step);
                    } else {
                        window.scrollTo({ top: newScrollPos, behavior: 'smooth' });
                        isScrolling = false;
                        callback()
                    }
                }
                getRequestAnimationFrame()(step);
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
        if (!isScrollPending.current && slide >= 0 && slide < slidesCount) {      
            isScrollPending.current = true
            animatedScrollTo(slides[slide], () => isScrollPending.current = false);
        }
    }

    const onScroll = (evt) => {   
        evt.preventDefault();
        if (isScrollPending.current || lethargy.check(evt) === false) return;
        const scrollDown = (evt.wheelDelta || -evt.deltaY || -evt.detail) < 0;
        let newActiveSlide = scrollDown ? currentPage+1 : currentPage-1
        if (newActiveSlide == -1)
            newActiveSlide = 0
        else if (newActiveSlide == slidesCount)
            newActiveSlide = slidesCount -1
        setCurrentPage(newActiveSlide)
    }

    const onResize = () => updateSlides();

    useEffect(() => {
        const isMobile = isMobileDevice();
        if (isMobile) {
            //document.addEventListener('touchmove', this.onTouchMove, { passive: false });
            //document.addEventListener('touchstart', this.onTouchStart);
        } else {
            document.addEventListener('wheel', onScroll, { passive: false });
        }
        window.addEventListener('resize', onResize);
    
        onResize();    
      return () => {
        document.removeEventListener('wheel', onScroll, { passive: false });
        document.removeEventListener('resize', onResize);
      }
    }, [currentPage])

    useEffect(() => {
        if (hasPageBeenRendered.current["effect"]) {
            scrollToSlide(currentPage);
        }
        hasPageBeenRendered.current["effect"] = true
    }, [currentPage])

    return (
    <>
        <Slider slidesCount={slidesCount}/>
        {childrenArray.map((child, index) => (
            <div className={s.slide} key={index}>{child}</div>
        ))}
    </>
    )
}

