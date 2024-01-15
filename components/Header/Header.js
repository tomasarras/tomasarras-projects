import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Header.module.css";
import { Context } from '../../Context';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { useToggle } from '../../hooks/useToggle';
import DropdownHeaderMenu from '../Dropdown/DropdownHeaderMenu';
import { motion } from 'framer-motion';

const AnimatedMenuItem = ({ isOpen, i, children }) => {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      x: 200,
    },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
      }
    })
  }

  return <motion.span variants={fadeInAnimationVariants} initial="initial" animate={isOpen ? "animate" : "initial"} custom={i}>{children}</motion.span>
}

export default function Header() {
  const { currentPage } = useContext(Context);
  const headerRef = useRef()
  const [isActive, setIsActive] = useState(false);
  const [firstPagePassed, setFirstPagePassed] = useState(false);
  const [isSidebarOpen, toggleSidebar] = useToggle()

  useEffect(() => {
    if (currentPage >= 1 && !firstPagePassed)
      setFirstPagePassed(true)
    setIsActive(currentPage >= 1);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutsideHeader = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        toggleSidebar()
      }
    }
    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutsideHeader)
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideHeader)
    }
  }, [isSidebarOpen])
  

  return (<>
    <header ref={headerRef} className={`${styles.header} sm:mt-4`}>
      <div className='w-full sm:container sm:mx-auto'>
        {/** MOBILE */}
        <div className={`${styles.blur} ${styles.mobileContainer} flex justify-between items-center container sm:hidden`}>
          <div>Tomas Arras</div>
          <div>
            <div className="h-6 w-8" onClick={toggleSidebar}>
              <HamburgerIcon width={32} height={24} isOpen={isSidebarOpen} transition={{ ease: "easeOut", duration: 0.2 }} strokeWidth="2"/>
            </div>
          </div>
        </div>
        <DropdownHeaderMenu isOpen={isSidebarOpen} onClose={toggleSidebar}>
          <nav>
            <ul className={`${styles.dropdownMobile} flex flex-col divide-y w-full items-end`}>
              <li><AnimatedMenuItem isOpen={isSidebarOpen} i={0}>About</AnimatedMenuItem></li>
              <li><AnimatedMenuItem isOpen={isSidebarOpen} i={1}>Skills</AnimatedMenuItem></li>
              <li><AnimatedMenuItem isOpen={isSidebarOpen} i={2}>Experience</AnimatedMenuItem></li>
              <li><AnimatedMenuItem isOpen={isSidebarOpen} i={3}>Portfolio</AnimatedMenuItem></li>
              <li><AnimatedMenuItem isOpen={isSidebarOpen} i={4}>Contact</AnimatedMenuItem></li>
            </ul>
          </nav>
        </DropdownHeaderMenu>
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