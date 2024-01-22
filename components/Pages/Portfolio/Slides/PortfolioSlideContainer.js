import React, { useEffect, useRef, useState } from 'react';
import DotsSlider from '../../../DotsSlider/DotsSlider';
import { motion } from 'framer-motion';
import { animationScrollDuration } from '../../../../constants/Constants';
import { easeInOutCirc, getRequestAnimationFrame } from '../../../../utils/utils';

export default function PortfolioSlideContainer({ children, className, innerRef }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const childrenArray = React.Children.toArray(children)
  const childrenRefs = useRef([])
  const sliderRef = useRef()
  const sliderContainerRef = useRef()


  useEffect(() => {
    if (sliderRef.current == undefined) return
    const screenXSize = sliderContainerRef.current.offsetWidth/childrenArray.length
    const startValue = sliderRef.current.scrollLeft
    let stopValue = screenXSize * currentIndex
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
  }, [currentIndex, sliderRef, sliderContainerRef])
  

  return (<div className='relative overflow-hidden'>
    <div ref={sliderRef} className={`w-full h-full relative ${className} overflow-x-scroll`}>
      <div ref={el => {innerRef.current = el; sliderContainerRef.current = el}} style={{width: (childrenArray.length * 100) + "%"}} className='h-full flex items-center justify-center'>
        {childrenArray.map((child, index) => 
          <motion.div style={{width: "100vw"}}ref={el => childrenRefs.current[index] = el} className='' key={index}>{child}</motion.div>
        )}
      </div>
    </div>
    <div className={`absolute top-0 left-0 flex justify-center w-full h-full items-end`}>
      <div><DotsSlider amount={childrenArray.length} active={currentIndex} setActive={setCurrentIndex}/></div>
    </div>
  </div>)
  
}