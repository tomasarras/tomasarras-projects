import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./Header.module.css";
import { Context } from '../../Context';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { useToggle } from '../../hooks/useToggle';
import DropdownHeaderMenu from '../Dropdown/DropdownHeaderMenu';
import { motion } from 'framer-motion';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { isDesktop, isTablet } from '../../utils/utils';

//TODO: scroll on header bug 
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

export default function Header({ sections }) {
  const { currentPage, setCurrentPage, scrollY } = useContext(Context);
  const size = useWindowDimensions()
  const headerRef = useRef()
  const [isActive, setIsActive] = useState(false);
  const [firstPagePassed, setFirstPagePassed] = useState(false);
  const [isSidebarOpen, toggleSidebar] = useToggle()

  useEffect(() => {
    if (isDesktop(size)) {
      if (currentPage >= 1 && !firstPagePassed)
        setFirstPagePassed(true)
      setIsActive(currentPage >= 1);
    } else if (isTablet(size)) {
      if (scrollY >= 1 && !firstPagePassed)
        setFirstPagePassed(true)
      setIsActive(scrollY >= 1);
    } else {

    }
  }, [currentPage, scrollY, size]);

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

  const handleChangeIndexMobile = (index) => {
    if (index == 0) {
      if (isSidebarOpen) {
        toggleSidebar()
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetTop = sections.current[index].getBoundingClientRect().top + scrollY - 20 - 60;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      toggleSidebar()
    }
  }

  return (<>
    <header ref={headerRef} className={`${styles.header} sm:mt-4`}>
      <div className='w-full sm:container sm:mx-auto'>
        {/** MOBILE */}
        <div className={`${styles.blur} ${styles.mobileContainer} flex justify-between items-center sm:hidden`}>
          <div className='container flex justify-between items-center'>
            <div onClick={() => handleChangeIndexMobile(0)}>Tomas Arras</div>
            <div>
              <div className="h-6 w-8" onClick={toggleSidebar}>
                <HamburgerIcon width={32} height={24} isOpen={isSidebarOpen} transition={{ ease: "easeOut", duration: 0.2 }} strokeWidth="2"/>
              </div>
            </div>
          </div>
        </div>
        <DropdownHeaderMenu isOpen={isSidebarOpen} onClose={toggleSidebar}>
          <nav>
            <ul className={`${styles.dropdownMobile} flex flex-col divide-y w-full items-end`}>
              <li onClick={() => handleChangeIndexMobile(1)}><AnimatedMenuItem isOpen={isSidebarOpen} i={0}>About</AnimatedMenuItem></li>
              <li onClick={() => handleChangeIndexMobile(2)}><AnimatedMenuItem isOpen={isSidebarOpen} i={1}>Skills</AnimatedMenuItem></li>
              <li onClick={() => handleChangeIndexMobile(3)}><AnimatedMenuItem isOpen={isSidebarOpen} i={2}>Experience</AnimatedMenuItem></li>
              <li onClick={() => handleChangeIndexMobile(4)}><AnimatedMenuItem isOpen={isSidebarOpen} i={3}>Portfolio</AnimatedMenuItem></li>
              <li onClick={() => handleChangeIndexMobile(5)}><AnimatedMenuItem isOpen={isSidebarOpen} i={4}>Contact</AnimatedMenuItem></li>
            </ul>
          </nav>
        </DropdownHeaderMenu>
        {/** DESKTOP */}
        <div className={`${styles.headerWrapper} hidden sm:block relative`}>
          <div className={`${styles.borderContainer} ${isActive && styles.active} absolute w-full h-full`}>
            <div className={`${firstPagePassed && styles.black} w-full h-full ${styles.blur}`}></div>
          </div>
          <div className={`${styles.headerContainer} p-2 ${isActive && styles.visible}`}>
            <div onClick={() => setCurrentPage(0)} className={`ms-4 cursor-pointer ${styles.logo} ${isActive && styles.visible}`}>Tomas Arras</div>
            <nav className={`hidden sm:block me-4 ${styles.nav} ${isActive && styles.visible}`}>
              <ul>
                <li className='ms-4 cursor-pointer' onClick={() => setCurrentPage(1)}>About</li>
                <li className='ms-4 cursor-pointer' onClick={() => setCurrentPage(2)}>Skills</li>
                <li className='ms-4 cursor-pointer' onClick={() => setCurrentPage(3)}>Experience</li>
                <li className='ms-4 cursor-pointer' onClick={() => setCurrentPage(4)}>Portfolio</li>
                <li className='ms-4 cursor-pointer' onClick={() => setCurrentPage(5)}>Contact</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </>)
}