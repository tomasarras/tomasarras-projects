import React from 'react';
import styles from "./Experience.module.css";
import WorkTimeline from '../../timeline/Timeline';
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
  <div ref={innerRef} className='flex justify-between items-center'>
    <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-4 2xl:grid-cols-12'>
      <AnimationHandler
        isAnimationEnabled={isDesktop(size)}
        {...animation}
        className='xxl:flex xxl:items-center lg:col-span-4 xxl:col-span-6 2xl:col-span-4'>
        <div>
          <div className='d-flex items-center w-100 flex-column mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>Experience</h1>
            <div className='title-underline'></div>
          </div>
          <p className='mb-10'>A lo largo de mi carrera, he tenido el privilegio de trabajar en diversos roles y tecnologías que han ampliado mi experiencia en el desarrollo web con tecnologías de frontend y de backend. Aquí hay un vistazo a algunas de mis experiencias más destacadas:</p>
          <div className='hidden lg:flex justify-center'>
            <div className='sm:w-8/12 lg:w-full xl:w-8/12'>
              <Image src={experienceImageIllustration} alt='illustration'/>
            </div>
          </div>
        </div>
      </AnimationHandler>
      <div className='lg:col-span-8 xxl:col-span-6 2xl:col-start-6 2xl:col-span-7'>
        <WorkTimeline/>
      </div>
    </div>
  </div>);
}