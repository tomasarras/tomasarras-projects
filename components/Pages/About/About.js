import React, { useContext, useEffect, useState } from 'react';
import DesktopAnimation from '../../DesktopAnimation/DesktopAnimation';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import styles from "./About.module.css"
import { Context } from '../../../Context';
import { animationScrollDuration } from '../../../constants/Constants';
import { isDesktop } from '../../../utils/utils';

export default function About() {
  const { currentPage } = useContext(Context)
  const size = useWindowDimensions()
  const scrollAnimation = useAnimationScroll(1)
  const animation = isDesktop(size) ? scrollAnimation : {}
  const dotsDecorationAnimation = {
    y: currentPage === 2 ? size.height /10 : 0
  }


  return (
    <div className={`sm:grid sm:gap-4 sm:grid-cols-12 sm:align-center`}>
      <motion.div {...animation} className='sm:col-span-5 flex flex-column items-center justify-center'>
        <div className='d-flex items-center w-100 flex-column mb-6'>
          <h1 className='mb-4 text-5xl font-bold'>About me</h1>
          <div className='title-underline'></div>
        </div>
        <h2 className='text-3xl mb-6'>Full Stack Web Developer</h2>
        <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
      </motion.div>
      <div className={`mt-4 sm:flex col-start-7 col-span-12 flex-column items-center justify-center relative`}>
        <motion.div animate={dotsDecorationAnimation} transition={{ duration: animationScrollDuration / 1000 }} className={styles.dots}></motion.div>
        <div className='w-full flex justify-center'>
          <DesktopAnimation className="w-50 sm:w-full"/>
        </div>
      </div>
    </div>);
}