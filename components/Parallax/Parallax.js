import React, { useContext, useEffect, useState } from 'react';
import styles from "./Parallax.module.css";
import CodeLines from './CodeLines/CodeLines';
import MouseAnimation from '../Icons/MouseAnimation/MouseAnimation';
import Semicolon from '../Icons/Semicolon/Semicolon';
import { Context } from '../../Context';
import { motion } from 'framer-motion';
import { animationScrollDuration } from '../../constants/Constants';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Image from 'next/image';
import DevIconPlain from '../Icons/Dev/DevIconPlain';
import MobileAnimation from '../Icons/MouseAnimation/MobileAnimation';
import RadialDecorator from '../Decorators/RadialDecorator';

export default function Parallax() {
  const { currentPage, scrollY } = useContext(Context);
  const size = useWindowDimensions();
  const tomasarrasTop = (size.height * 3) + (size.height / 1.3)
  const lines3Top = (size.height * 2) + (size.height / 1.5)
  const lines4Top = (size.height * 3) + (size.height / 1.5)
  const lines5Top = (size.height * 4) + (size.height / 1.5)
  const lines6Top = (size.height * 5) + (size.height / 1.5)
  const animation = (translation) => (
    {
      animate: { y: currentPage*translation*-1 },
      transition: { ease:"circInOut", duration: animationScrollDuration/1000 }
    }
  )

  const animationT = (translation, page) => {
    const offset = currentPage * size.height *-1;
    const offsetTranslation = currentPage - page
    const y = offset + (offsetTranslation*translation*-1)
    return {
      animate: { y },
      transition: { ease:"circInOut", duration: animationScrollDuration/1000 }
    }
  }

  

  return (<>
  <div className={styles.layer1}>
    <motion.div {...animation(size.height * .43)}  className={`${styles.lines1}`}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <motion.div {...animation(size.height * .95)} className={`${styles.lines2}`}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <div className={`${styles.mouse} ${scrollY > 0 ? styles.mousePassed : ''}`}>
      <div className='h-8 w-8 hidden sm:block'>
        <MouseAnimation/>
      </div>
      <div className='h-10 w-10 invert-color sm:hidden'>
        <MobileAnimation/>
      </div>
    </div>
    <motion.div {...animation(size.height * .266)} className={`${styles.semicolon}`}>
      <Semicolon width={size.width * 0.02} height={size.width * 0.02}/>
    </motion.div>
    <motion.div {...animation(size.height * .32)} className={`${styles.dev}`}>
      <DevIconPlain width={size.width * 0.05} height={size.width * 0.05} />
    </motion.div>
    <motion.div {...animationT(size.height *.1, 3)} className={`${styles.tomasarras}`} style={{top: tomasarrasTop}}>
      <Image src="/portrait/portrait_deco.png" width={size.width * 0.2} height={size.width * 0.2} alt='Tomas Arras'/>
    </motion.div>
    <motion.div {...animationT(size.height *.5, 2)}  className={`${styles.lines3}`} style={{top: lines3Top}}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <motion.div {...animationT(size.height *.2, 3)}  className={`${styles.lines4}`} style={{top: lines4Top}}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <motion.div {...animationT(size.height *.2, 4)}  className={`${styles.lines3}`} style={{top: lines5Top}}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
    <motion.div {...animationT(size.height *.2, 5)}  className={`${styles.lines4}`} style={{top: lines6Top}}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </motion.div>
  </div>
  <div className={styles.layer2}>
    {/* <RadialDecorator top="5%" left={"-"+size.width*2 +"px"}/>
    <RadialDecorator top="45%" left={"-"+size.width/2 +"px"}/> */}
  </div>
  </>)
}