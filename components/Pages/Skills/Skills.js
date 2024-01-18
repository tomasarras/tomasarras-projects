import React, { useState, useContext } from 'react';
import styles from './Skills.module.css';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import { Context } from '../../../Context';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { animationScrollDuration } from '../../../constants/Constants';
import { isDesktop } from '../../../utils/utils';
import frontendImgDecoration from '../../../public/frontend-resize.png'
import devopsImgDecoration from '../../../public/devops-resize.png'
import backendImgDecoration from '../../../public/backend-resize.png'
import AnimationHandler from '../../Utils/AnimationHandler';

export default function Skills({ innerRef }) {
  const [highlightedType, setHighlightedType] = useState(null);
  const { currentPage } = useContext(Context)
  const animation = useAnimationScroll(2);
  const size = useWindowDimensions()
  const isAnimationEnabled = isDesktop(size)
  const devIconSize = isAnimationEnabled ? 60 : 40;
  const imgDecorationAnimation = {
    y: currentPage === 2 ? 0 : currentPage === 1 ? size.height /10 : size.height /10 *-1,
  }
  const dotsDecorationAnimation = {
    y: currentPage === 2 ? 0 : currentPage === 1 ? size.height /10 *-1 : size.height /10,
  }
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      }
    })
  }
  const devIcons = [{
    src: "react.svg",
    name: "React",
    type: "frontend",
  },
  {
    src: "vue.svg",
    name: "Vue",
    type: "frontend",
  },
  {
    src: "bootstrap.svg",
    name: "Bootstrap",
    type: "frontend",
  },
  {
    src: "tailwind.svg",
    name: "Tailwind",
    type: "frontend",
  },
  {
    src: "docker.svg",
    name: "Docker",
    type: "devops",
  },
  {
    src: "git.svg",
    name: "Git",
    type: "devops",
  },
  {
    src: "postgresql.svg",
    name: "PostgreSQL",
    type: "backend",
  },
  {
    src: "postman.svg",
    name: "Postman",
    type: "backend",
  },
  {
    src: "spring.svg",
    name: "Spring",
    type: "backend",
  },
  {
    src: "java.svg",
    name: "Java",
    type: "backend",
  },
  {
    src: "aws.svg",
    name: "AWS",
    type: "devops",
  },
  {
    src: "jenkins.svg",
    name: "Jenkins",
    type: "devops",
  }];

  return (
    <div ref={innerRef} className='sm:h-full align-center flex-col d-flex justify-between items-center'>
      <div className='w-full h-full align-center flex flex-column sm:grid sm:gap-4 sm:grid-cols-12 justify-between items-center'>
        <AnimationHandler isAnimationEnabled={isAnimationEnabled} {...animation} className='sm:col-span-6 '>
          <div className='d-flex items-center w-100 flex-column mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>Skills</h1>
            <div className='title-underline'></div>
          </div>
          <p>Mi caja de herramientas está llena de lenguajes de programación, frameworks y tecnologías modernas. Desde el frontend con React, Vue, Bootstrap, Tailwind hasta el backend con Spring, Laravel, ExpressJS, estoy equipado para abordar una variedad de proyectos desafiantes.</p>
        </AnimationHandler>
  
        <div className='my-10 sm:my-0 w-full relative sm:col-start-6 sm:col-span-6 flex justify-center items-center sm:h-full relative'>
          <div className={`sm:hidden ${styles.dots} absolute w-full h-50`}></div>
          <div className={`w-4/5`}>
            <div className='relative top-0'>
              <AnimationHandler isAnimationEnabled={isAnimationEnabled} animate={dotsDecorationAnimation} transition={{ duration: animationScrollDuration / 1000 }} 
                className={`hidden sm:block ${styles.dotsDesktop} ${styles.dots} absolute t-0 l-0 w-full h-50`}>
              </AnimationHandler>
              <AnimationHandler isAnimationEnabled={isAnimationEnabled} animate={imgDecorationAnimation} transition={{ duration: animationScrollDuration / 1000 }}>
                <Image className={`${styles.imgDecoration} ${highlightedType === null || highlightedType == "frontend" ? styles.active : ""} sm:ml-10`} src={frontendImgDecoration} alt='front-end'/>
                <Image className={`${styles.imgDecoration} ${highlightedType === null || highlightedType == "devops" ? styles.active : ""} absolute top-0 sm:ml-10`} src={devopsImgDecoration} alt='devops'/>
                <Image className={`${styles.imgDecoration} ${highlightedType === null || highlightedType == "backend" ? styles.active : ""} absolute top-0 sm:ml-10`} src={backendImgDecoration} alt='backend'/>
              </AnimationHandler>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full ${styles.icons}`}>
        <div className={`grid sm:gap-4 grid-cols-4 sm:grid-cols-6 mx-auto ${styles.iconsContainer}`}>
          {devIcons.map((icon, index) => (
            <motion.div
              className='d-flex flex-col justify-center items-center'
              variants={fadeInAnimationVariants}
              key={icon.src}
              initial="initial"
              whileInView="animate"
              custom={index}
            >
              <div style={{width: devIconSize, height: devIconSize}} className='flex justify-center items-center'>
                <img
                  src={"/icons/" + icon.src}
                  className={`${highlightedType === icon.type ? styles.active : ""}`}
                  alt="icon"
                  onMouseEnter={() => setHighlightedType(icon.type)}
                  onMouseLeave={() => setHighlightedType(null)}
                />
              </div>
              <span className={`text-center ${highlightedType === icon.type ? "" : styles.invisible} ${styles.iconLabel}`}>{icon.name}</span>
            </motion.div>))}
        </div>
      </div>
    </div>
    
  );
}