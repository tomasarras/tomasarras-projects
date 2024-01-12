import React, { useContext, useEffect, useRef, useState } from 'react';
import s from "./DesktopAnimation.module.css";
import Image from 'next/image';
import { Context } from '../../Context';
import { motion } from 'framer-motion';
import Dev from '../Icons/Dev/Dev';

export default function DesktopAnimation({ width, height }) {
  const { currentPage } = useContext(Context);
  const showInPage = 1;
  const passed = currentPage > showInPage;
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const codeVariants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
    },
    hover: {
      scale: 1.05,
      x: -6,
      y: -2,
    }
  }

  const codeAnimation = {
    initial:"initial",
    whileHover:"hover",
    variants: codeVariants
  }

  // useEffect(() => {
  //   setIsActive(currentPage >= showInPage)
  // }, [currentPage])

  useEffect(() => {
    console.log(isActive, "isssss");
  }, [isActive])
  
  

  useEffect(() => {
    const handleScroll = () => {
      console.log("ESCROLS");
      // Obtén el valor actual del scroll
      const scrollY = window.scrollY || window.pageYOffset;
      console.log("scrollY", scrollY);
      // Puedes ajustar estos valores según tus necesidades
      const element = containerRef.current; 
      const elementTop = element.getBoundingClientRect().top + scrollY;
      const elementBottom = elementTop + element.clientHeight;

      // Verifica si el elemento está en la pantalla
      setIsActive(scrollY >= elementTop && scrollY <= elementBottom);
    };

    // Agrega el evento de scroll al montar el componente
    window.addEventListener('scroll', handleScroll);

    // Limpia el evento al desmontar el componente para evitar pérdida de rendimiento
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (<>
  <div ref={containerRef} style={{width, height}} className={`${s.container} ${isActive ? s.active : ""} ${passed ? s.invisible : ""}`}>
    <div className={`${s.layer1} ${s.layer}`}>
      <Image
        src="/desktop/desktop.svg"
        alt="Desktop"
        width={width}
        height={width}
      />
    </div>
    <div className={`${s.layer2} ${s.layer}`}>
      <div style={{width, height}} className={`${s.item} ${s.console1}`}>
        <div style={{width: width * 0.45,height: height * 0.45}} className='absolute'>
          <Image
            src="/desktop/background/b1/code_console2.svg"
            alt="Console"
            className={`${s.opacity}`}
            width={width * 0.45}
            height={width * 0.45}
          />
          <motion.div {...codeAnimation}>
            <Image
              src="/desktop/background/b1/lines.svg"
              alt="Lines"
              className={`${s.lines}`}
              width={width * 0.45}
              height={width * 0.45}
            />
          </motion.div>
        </div>
      </div>

      <div style={{width, height}} className={`${s.item} ${s.console2}`}>
        <div style={{width: width * 0.35,height: height * 0.35}} className='absolute'>
          <Image
            src="/desktop/background/b2/code_console.svg"
            alt="Console"
            className={`${s.opacity}`}
            width={width * 0.35}
            height={width * 0.35}
          />
          <motion.div {...codeAnimation}>
            <Image
              src="/desktop/background/b2/lines.svg"
              alt="Lines"
              className={`${s.lines}`}
              width={width * 0.35}
              height={width * 0.35}
            />
          </motion.div>
        </div>
      </div>

      <div style={{width, height}} className={`${s.item} ${s.console3}`}>
        <div style={{width: width * 0.35,height: height * 0.35}} className='absolute'>
          <Image
            src="/desktop/background/b3/code_console.svg"
            alt="Console"
            className={`${s.opacity}`}
            width={width * 0.35}
            height={width * 0.35}
          />
          <motion.div {...codeAnimation}>
            <Image
              src="/desktop/background/b3/lines.svg"
              alt="Lines"
              className={`${s.lines}`}
              width={width * 0.35}
              height={width * 0.35}
            />
          </motion.div>
        </div>
      </div>

      <div style={{width, height}} className={`${s.item} ${s.front1}`}>
        <div style={{width: width * 0.35,height: height * 0.35}} className='absolute'>
          <Image
            src="/desktop/background/b4/b2.svg"
            alt="Console"
            className={`${s.opacity}`}
            width={width * 0.35}
            height={width * 0.35}
          />
          <motion.div {...codeAnimation}>
            <Image
              src="/desktop/background/b4/b1.svg"
              alt="Lines"
              className={`${s.lines}`}
              width={width * 0.35}
              height={width * 0.35}
            />
          </motion.div>
        </div>
      </div>

      <div style={{width, height}} className={`${s.item} ${s.front2}`}>
        <div style={{width: width * 0.15,height: height * 0.15}} className='absolute'>
          <Image
            src="/desktop/background/b5/b1.svg"
            alt="Console"
            className={`${s.opacity}`}
            width={width * 0.15}
            height={width * 0.15}
          />
          <motion.div {...codeAnimation}>
            <Image
              src="/desktop/background/b5/b2.svg"
              alt="Lines"
              className={`${s.lines}`}
              width={width * 0.15}
              height={width * 0.15}
            />
          </motion.div>
        </div>
      </div>

      <div style={{width, height}} className={`${s.dev}`}>
        <div style={{width: width * 0.20, height: width * 0.20}} className={s.devShadow}></div>
        <div style={{width: width * 0.20,height: height * 0.20}} className='relative'>
          <Image
            src="/desktop/background/b6/circle.svg"
            alt="Lines"
            className={`${s.devImg}`}
            width={width * 0.20}
            height={width * 0.20}
          />
          <motion.div animate={{ y: [0,2,0,-2,0] }} transition={{ repeat: Infinity, duration: 3, transition: 'ease' }} className={s.devMov}>
            <Dev
              className={`${s.devImg}`}
              width={width * 0.20}
              height={width * 0.20}
            />
          </motion.div>
        </div>
      </div>
    </div>
  </div>
  </>);
}