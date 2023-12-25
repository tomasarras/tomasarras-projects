import React, { useContext, useEffect, useState } from 'react';
import styles from "./Parallax.module.css";
import CodeLines from './CodeLines';
import { useWindowSize } from "@uidotdev/usehooks";
import MouseAnimation from '../Icons/MouseAnimation';
import Semicolon from '../Icons/Semicolon';
import Dev from '../Icons/Dev';
import { Context } from '../../Context';
import { motion, useTransform } from 'framer-motion';
import { useEaseScrollAnimation } from '../../hooks/useEaseScrollAnimation';

export default function Parallax() {
  const { currentPage } = useContext(Context);
  const size = useWindowSize();
  const easeValue = useEaseScrollAnimation()
  console.log(easeValue,"easeValue");//poner useTransform con esto
  const t = useTransform(easeValue, [0,1], [1,2]);
  console.log(t, "t");//poner useTransform con esto

  return (<div className={styles.layer1}>
    <motion.div animate={{y: currentPage == 0 ? 0:-650}} transition={{duration: .9}} className={`${styles.lines1} ${currentPage >= 1 ? styles.lines1Passed : ''}`}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <div className={`${styles.lines2} ${currentPage >= 1 ? styles.lines2Passed : ''}`}>
      <CodeLines width={size.width * 0.45} height={size.width * 0.45}/>
    </div>
    <div className={`${styles.mouse} ${currentPage >= 1 ? styles.mousePassed : ''}`}>
      <MouseAnimation/>
    </div>
    <div className={`${styles.semicolon} ${currentPage >= 1 ? styles.semicolonPassed : ''}`}>
      <Semicolon width={size.width * 0.02} height={size.width * 0.02}/>
    </div>
    <div className={`${styles.dev} ${currentPage >= 1 ? styles.devPassed : ''}`}>
      <Dev width={size.width * 0.07} height={size.width * 0.07}/>
    </div>
    
  </div>)
}