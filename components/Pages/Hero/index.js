import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion'
import FaceLogo from '../../FaceLogo';
export default function Hero() {
  const faceLogoSize = 270;
  const faceAnimation = {
    hidden: {
      y:100,
      opacity:0
    },
    visible: {
      y:0,
      opacity:1,
      transition: {
        duration: 0.2
      }
    }
  }

  const textAnimation = {
    hidden: {
      y:100,
      opacity:0
    },
    visible: {
      y:0,
      opacity:1,
      transition: {
        delay: 0.2
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <motion.div initial="hidden" animate="visible" variants={faceAnimation}>
        <FaceLogo size={faceLogoSize}/>
      </motion.div>
      <motion.h1 initial="hidden" animate="visible" variants={textAnimation} className={"mt-8"}>Hello friend.</motion.h1>
    </div>
  );
}