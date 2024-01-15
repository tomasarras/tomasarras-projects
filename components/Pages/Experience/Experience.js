import React from 'react';
import styles from "./Experience.module.css";
import WorkTimeline from '../../timeline';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import { motion } from 'framer-motion';
import AnimationHandler from '../../Utils/AnimationHandler';
import { isDesktop } from '../../../utils/utils';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

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
          <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
        </div>
      </AnimationHandler>
      <div className='sm:w-6/12 flex flex-col sm:ms-2'>
        <WorkTimeline/>
      </div>
    </div>
  </div>);
}