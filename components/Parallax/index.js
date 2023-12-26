import React, { useContext, useEffect, useState } from 'react';
import styles from "./Parallax.module.css";
import CodeLines from './CodeLines';
import { useWindowSize } from "@uidotdev/usehooks";
import MouseAnimation from '../Icons/MouseAnimation';
import Semicolon from '../Icons/Semicolon';
import Dev from '../Icons/Dev';
import { Context } from '../../Context';
import { motion } from 'framer-motion';
import { animationScrollDuration } from '../../constants';

export default function Parallax() {
  const { currentPage } = useContext(Context);
  const size = useWindowSize();
  const animation = (translation) => (
    {
      animate: { y: currentPage*translation*-1 },
      transition: { ease:"circInOut", duration: animationScrollDuration/1000 }
    })

  return (<div className={styles.layer1}>
    <motion.div {...animation(400)}  className={`${styles.lines1} ${currentPage >= 1 ? styles.lines1Passed : ''}`}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <motion.div {...animation(900)} className={`${styles.lines2} ${currentPage >= 1 ? styles.lines2Passed : ''}`}>
      <CodeLines width={size.width * 0.45} height={size.width * 0.45}/>
    </motion.div>
    <div className={`${styles.mouse} ${currentPage >= 1 ? styles.mousePassed : ''}`}>
      <MouseAnimation/>
    </div>
    <motion.div {...animation(250)} className={`${styles.semicolon} ${currentPage >= 1 ? styles.semicolonPassed : ''}`}>
      <Semicolon width={size.width * 0.02} height={size.width * 0.02}/>
    </motion.div>
    <motion.div {...animation(300)} className={`${styles.dev} ${currentPage >= 1 ? styles.devPassed : ''}`}>
      <Dev width={size.width * 0.07} height={size.width * 0.07}/>
    </motion.div>
    
  </div>)
}