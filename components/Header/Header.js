import React, { useContext, useEffect, useState } from 'react';
import styles from "./Header.module.css";
import { useRef } from 'react';
import { Context } from '../../Context';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Image from 'next/image';
import hamburgerIcon from "../../public/icons/hamburger.svg"
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { useToggle } from '../../hooks/useToggle';
import SidebarResponsive from '../Sidebar/SidebarResponsive';
import CustomSidebar from '../Sidebar/CustomSidebar';

export default function Header() {
  const { currentPage } = useContext(Context);
  const [isActive, setIsActive] = useState(false);
  const [firstPagePassed, setFirstPagePassed] = useState(false);
  const [isSidebarOpen, toggleSidebar] = useToggle()

  useEffect(() => {
    if (currentPage >= 1 && !firstPagePassed)
      setFirstPagePassed(true)
    setIsActive(currentPage >= 1);
  }, [currentPage]);

  return (<>
    <header className={`${styles.header} sm:mt-4`}>
      <div className='w-full sm:container sm:mx-auto'>
        {/** MOBILE */}
        <CustomSidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
          <div>asofgapsoigfj</div>
        </CustomSidebar>
        <div className={`${styles.blur} ${styles.mobileContainer} flex justify-between items-center container sm:hidden`}>
          <div>Tomas Arras</div>
          <div>
            <div className="h-8 w-8" onClick={toggleSidebar}>
              <HamburgerIcon/>
            </div>
          </div>
        </div>
        {/** DESKTOP */}
        <div className={`${styles.headerWrapper} hidden sm:block relative`}>
          <div className={`${styles.borderContainer} ${isActive && styles.active} absolute w-full h-full`}>
            <div className={`${firstPagePassed && styles.black} w-full h-full ${styles.blur}`}></div>
          </div>
          <div className={`${styles.headerContainer} p-2 ${isActive && styles.visible}`}>
            <div className={`ms-4 ${styles.logo} ${isActive && styles.visible}`}>Tomas Arras</div>
            <nav className={`hidden sm:block me-4 ${styles.nav} ${isActive && styles.visible}`}>
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
      </div>
    </header>
  </>)
}