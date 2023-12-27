import React, { useEffect, useState } from 'react';
import DesktopAnimation from '../../DesktopAnimation';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import useWindowDimensions from "../../../hooks/useWindowDimensions"

export default function About() {
  const size = useWindowDimensions()
  const animation = useAnimationScroll(1)

  return (
    <div className='w-100 h-100 align-center d-flex justify-between items-center'>
      <div {...animation} className='w-5/12'>
        <div className='d-flex items-center w-100 flex-column mb-6'>
          <h1 className='mb-4 text-5xl font-bold'>About me</h1>
          <div className='title-underline'></div>
        </div>
        <h2 className='text-3xl mb-6'>Full Stack Web Developer</h2>
        <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
      </div>
      <div className='w-7/12 d-flex justify-center'>
        <DesktopAnimation width={600} height={600}/>
      </div>
    </div>);
}