"use client"
import { useEffect, useRef, useState } from 'react';
import RadialDecorator from './RadialDecorator';

export default function RadialDecorators() {
  const containerRef = useRef()
  const radialSize = "min(1920px, 100vw)"
  const [parentHeight, setParentHeight] = useState("600vh")

  useEffect(() => {
    if (containerRef.current){ 
      setParentHeight(containerRef.current.parentElement.offsetHeight)
    }
  }, [containerRef]);
  

  return (
  <div ref={containerRef} style={{height: parentHeight + "px"}} className={"layer2"}>
    <RadialDecorator top={`50vh`}  size={radialSize} left/>
    <RadialDecorator top={`200vh`} size={radialSize}/>
    <RadialDecorator top={`300vh`} size={radialSize} left/>
    <RadialDecorator top={`430vh`} size={radialSize}/>
  </div>
  )
}
