import React, { useContext, useEffect, useState } from 'react';
import styles from "./Parallax.module.css";
import CodeLines from './CodeLines';
import { useWindowSize } from "@uidotdev/usehooks";
import MouseAnimation from '../Icons/MouseAnimation';
import Semicolon from '../Icons/Semicolon';
import Dev from '../Icons/Dev';
import FaceLogo from '../FaceLogo';
import { Context } from '../../Context';

export default function Parallax() {
  const { currentPage } = useContext(Context);
  const size = useWindowSize();
  const faceLogoSize = 270;

  return (<div className={styles.layer1}>
    <div className={`${styles.lines1} ${currentPage >= 1 ? styles.lines1Passed : ''}`}>
      <CodeLines width={size.width * 0.25} height={size.width * 0.25}/>
    </div>
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
    <div style={{ width: faceLogoSize+"px", top: (size.height/2) - (faceLogoSize / 2) - 100 + "px", left: `${currentPage == 0 ? (size.width / 2) -  (faceLogoSize / 2) + "px" : "70%"}` }} className={`${styles.faceLogo} ${currentPage >= 1 ? styles.faceLogoPassed : ''}`}>
      <FaceLogo size={faceLogoSize}/>
    </div>
    
  </div>)
}