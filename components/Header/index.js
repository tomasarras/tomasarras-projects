import React, { useEffect, useState } from 'react';
import styles from "./Header.module.css";
import { useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

export default function Header({ currentIndex }) {
  const headerRef = useRef(null);
  const size = useWindowSize();
  const isActive = currentIndex >= 1;
  const headerClientRect = headerRef?.current?.getBoundingClientRect();
  const hcr = headerClientRect == undefined ? {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
  } : headerClientRect;
  const headerWidth = hcr?.width;
  const headerHeight = hcr?.height;

  useEffect(() => {
    console.log(headerRef.current.getBoundingClientRect());
  }, [headerRef]);

  return (<>
    <header className={`${styles.header} mt-4 ${currentIndex == 0 && styles.hidden}`}>
      <div style={{left: (isActive ? 0 : hcr.left*2) + "px", width: hcr.width + "px", height: hcr.height + "px"}} className={styles.borderContainer}>
        <div style={{left: (isActive ? 0 : (((size.width/2) + hcr.left*2)*-1)/2), width: headerWidth + "px", height: headerHeight + "px"}}></div>
      </div>
      <div ref={headerRef} className={`${styles.headerContainer} p-2 ${isActive && styles.visible}`}>
        <div className={`ms-4 ${styles.logo} ${isActive && styles.visible}`}>Tomas Arras</div>
        <nav className={`me-4 ${styles.nav} ${isActive && styles.visible}`}>
          <ul>
            <li className='ms-4'>About</li>
            <li className='ms-4'>Experience</li>
            <li className='ms-4'>Skills</li>
            <li className='ms-4'>Portfolio</li>
            <li className='ms-4'>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  </>)
}