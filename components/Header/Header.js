import React, { useContext, useEffect, useState } from 'react';
import styles from "./Header.module.css";
import { useRef } from 'react';
import { Context } from '../../Context';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function Header() {
  const { currentPage } = useContext(Context);
  const [isActive, setIsActive] = useState(false);
  const [firstPagePassed, setFirstPagePassed] = useState(false);
  
  useEffect(() => {
    if (currentPage >= 1 && !firstPagePassed)
      setFirstPagePassed(true)
    setIsActive(currentPage >= 1);
  }, [currentPage]);

  return (<>
    <header className={`${styles.header} mt-4`}>
      <div className={`${styles.headerWrapper} relative`}>
        <div className={`${styles.borderContainer} ${isActive && styles.active} absolute w-full h-full`}>
          <div className={`${firstPagePassed && styles.black} w-full h-full`}></div>
        </div>
        <div className={`${styles.headerContainer} p-2 ${isActive && styles.visible}`}>
          <div className={`ms-4 ${styles.logo} ${isActive && styles.visible}`}>Tomas Arras</div>
          <nav className={`me-4 ${styles.nav} ${isActive && styles.visible}`}>
            <ul>
              <li className='ms-4'>About</li>
              <li className='ms-4'>Skills</li>
              <li className='ms-4'>Experience</li>
              <li className='ms-4'>Portfolio</li>
              <li className='ms-4'>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </>)
}