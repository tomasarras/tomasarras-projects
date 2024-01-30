import React, { useContext, useEffect, useState } from 'react';
import DesktopAnimation from '../../DesktopAnimation/DesktopAnimation';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import styles from "./About.module.css"
import { Context } from '../../../Context';
import { animationScrollDuration } from '../../../constants/Constants';
import { isDesktop } from '../../../utils/utils';
import {useTranslations} from 'next-intl';

export default function About() {
  //const t = useTranslations("about")
  const { currentPage } = useContext(Context)
  const size = useWindowDimensions()
  const scrollAnimation = useAnimationScroll(1)
  const animation = isDesktop(size) ? scrollAnimation : {}
  const dotsDecorationAnimation = {
    y: currentPage === 2 ? size.height /10 : 0
  }


  return (
    <div className={`section md:grid md:gap-4 md:grid-cols-12`}>
      <motion.div
        {...animation}
        className={`${styles.colSpan1366Left}  flex flex-col items-center justify-center
        md:col-span-7 
        lg:col-span-6 
        xl:col-span-5 
        2xl:col-span-4`}
      >
        <div className='flex items-center w-100 flex-col mb-6'>
          <h1 className='mb-3 font-bold'>Hi, I'm Tomas Arras 👋</h1>
          <h2 className='mb-6'>Full Stack Web Developer</h2>
          <div className='title-underline'></div>
        </div>
        <p className='mb-7'>Un apasionado desarrollador web especializado en la creacion de soluciones tanto en el frontend como en el backend. Soy un aficionado a la tecnologia y tengo las habilidades para traducir ideas en codigo para crear experencias digitales y funcionales.</p>
        {/*<p>Me considero un solucionador de problemas apasionado. Superando desafíos con una mentalidad creativa y perseverante, buscando superar obstáculos para lograr productos de alta calidad.</p>*/}
      </motion.div>
      <div className={`md:flex col-start-7 col-span-6 md:col-span-5 lg:col-span-6 lg:col-start-7 flex-col items-center justify-center relative mt-4`}>
        <motion.div animate={dotsDecorationAnimation} transition={{ duration: animationScrollDuration / 1000 }} className={styles.dots}></motion.div>
        <div className='w-full flex justify-center'>
          <DesktopAnimation className="w-6/12 md:w-9/12 lg:w-full"/>
        </div>
      </div>
    </div>);
}