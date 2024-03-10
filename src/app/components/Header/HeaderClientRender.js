"use client"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../Context/index';
import * as HeaderContext from '../../Context/HeaderContext';
import { useToggle } from '../../hooks/useToggle';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { isDesktop, isTablet } from '../../utils/utils';
import styles from "./Header.module.css"

export default function HeaderClientRender({ children }) {
  const { currentPage, scrollY } = useContext(Context);
  const { setIsActive, firstPagePassed, setFirstPagePassed, isSidebarOpen, toggleSidebar } = useContext(HeaderContext.Context)
  const size = useWindowDimensions()
  const headerRef = useRef()

  useEffect(() => {
    if (isDesktop(size)) {
      if (currentPage >= 1 && !firstPagePassed)
        setFirstPagePassed(true)
      setIsActive(currentPage >= 1);
    } else if (isTablet(size)) {
      if (scrollY >= 1 && !firstPagePassed)
        setFirstPagePassed(true)
      setIsActive(scrollY >= 1);
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

  return (
    <div ref={headerRef} className={`${styles.header} md:mt-4`}>
      {children}
    </div>)

}