import React from 'react';
import styles from "./Experience.module.css";
import WorkTimeline from '../../timeline';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import { motion } from 'framer-motion';
import AnimationHandler from '../../Utils/AnimationHandler';
import { isDesktop } from '../../../utils/utils';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Image from 'next/image';
import experienceImageIllustration from "../../../public/experience-illustration.png"

export default function Experience({ innerRef }) {
  const size = useWindowDimensions()
  const animation = useAnimationScroll(3);

  return (
  <div ref={innerRef} className='flex align-center justify-between items-center'>
    <div className='flex flex-col sm:flex-row'>
      <AnimationHandler isAnimationEnabled={isDesktop(size)} {...animation} className='sm:w-6/12 sm:me-2'>
        <div>
          <div className='d-flex items-center w-100 flex-column mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>Experience</h1>
            <div className='title-underline'></div>
          </div>
          <p className='mb-10'>A lo largo de mi carrera, he tenido el privilegio de trabajar en diversos roles y tecnologías que han ampliado mi experiencia en el desarrollo web con tecnologías de frontend y de backend. Aquí hay un vistazo a algunas de mis experiencias más destacadas:</p>
          <div className='hidden sm:flex justify-center'>
            <div className='w-10/12'>
              <Image src={experienceImageIllustration}/>
            </div>
          </div>
        </div>
      </AnimationHandler>
      <div className='sm:w-6/12 flex flex-col sm:ms-2'>
        <WorkTimeline/>
      </div>
    </div>
  </div>);
}