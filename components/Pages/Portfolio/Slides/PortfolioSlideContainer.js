import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import DotsSlider from '../../../DotsSlider/DotsSlider';
import { motion } from 'framer-motion';
import { animationScrollDuration } from '../../../../constants/Constants';
import { easeInOutCirc, getRequestAnimationFrame } from '../../../../utils/utils';
import { Context } from '../../../../Context';
import { useSwipeable } from 'react-swipeable';

export default function PortfolioSlideContainer({ children, className, innerRef }) {
  const { subscribeBeforeCurrentPageUpdated, currentPage, portfolioIndex, setPortfolioIndex } = useContext(Context)
  const childrenArray = React.Children.toArray(children)
  const childrenRefs = useRef([])
  const sliderRef = useRef()
  const sliderContainerRef = useRef()
  const nextSlide = () => {
    const max = childrenArray.length
    if (portfolioIndex < (max-1)) {
      setPortfolioIndex(portfolioIndex+1)
    }
  }

  const previousSlide = () => {
    if (portfolioIndex > 0) {
      setPortfolioIndex(portfolioIndex-1)
    }
  }
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });


  const beforeUpdateCurrentPage = useCallback(
    (evt, newCurrentPage) => {
      const el = sliderRef.current.parentElement.parentElement
      if (el.contains(evt.target)) {
        if (newCurrentPage > currentPage) {
          if (portfolioIndex == (childrenArray.length-1)) {
            return true
          } else {
            setPortfolioIndex(portfolioIndex+1)
            return false
          }
        } else {
          if (portfolioIndex == 0) {
            return true
          } else {
            setPortfolioIndex(portfolioIndex-1)
            return false
          }
        }
      } else {
        return true
      }
    },
    [portfolioIndex, sliderRef, currentPage],
  )

  useEffect(() => {
    if (sliderRef.current != undefined)
      subscribeBeforeCurrentPageUpdated("PortfolioSlideContainer", beforeUpdateCurrentPage)
  }, [sliderRef, portfolioIndex, currentPage])

  useEffect(() => {
    if (sliderRef.current == undefined) return
    const screenXSize = sliderContainerRef.current.offsetWidth/childrenArray.length
    const startValue = sliderRef.current.scrollLeft
    let stopValue = screenXSize * portfolioIndex
    stopValue = stopValue - startValue
    let isScrolling = false;
    const requestAnimationFrame = getRequestAnimationFrame()
    function smoothScrollTo() {
      if (isScrolling) return;

      isScrolling = true;

      const startTime = performance.now();

      function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < animationScrollDuration) {
          const easedValue = easeInOutCirc(elapsedTime, startValue, stopValue, animationScrollDuration);
          sliderRef.current.scrollLeft = easedValue
          requestAnimationFrame(step);
        } else {
          sliderRef.current.scrollLeft = startValue + stopValue
          isScrolling = false;
        }
      }
      requestAnimationFrame(step);
    }
    smoothScrollTo();
  }, [portfolioIndex, sliderRef, sliderContainerRef])
  

  return (
  <div {...handlers} className='overflow-hidden'>
    <div className={`absolute top-0 left-0 flex justify-center w-full h-full items-end`}>
      <div><DotsSlider amount={childrenArray.length} active={portfolioIndex} setActive={setPortfolioIndex}/></div>
    </div>
    <div
      ref={sliderRef}
      className={`w-full h-full relative ${className} overflow-x-scroll`}
      >
      <div ref={el => {innerRef(el); sliderContainerRef.current = el}} style={{width: (childrenArray.length * 100) + "%"}} className='h-full flex items-center justify-center'>
        {childrenArray.map((child, index) => 
          <div style={{width: "100vw"}}ref={el => childrenRefs.current[index] = el} className='' key={index}>
            {React.cloneElement(child, { isActive: index === portfolioIndex })}
          </div>
        )}
      </div>
    </div>
    
  </div>)
  
}