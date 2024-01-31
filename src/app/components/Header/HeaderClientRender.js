"use client"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../Context';
import { useToggle } from '../../hooks/useToggle';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { isDesktop, isTablet } from '../../utils/utils';
import styles from "./Header.module.css"

export default function HeaderClientRender({ children }) {
  const { currentPage, setCurrentPage, scrollY } = useContext(Context);
  const size = useWindowDimensions()
  const headerRef = useRef()
  const [isActive, setIsActive] = useState(false);
  const [firstPagePassed, setFirstPagePassed] = useState(false);
  const [isSidebarOpen, toggleSidebar] = useToggle()

  useEffect(() => {
    console.log("useE",currentPage, scrollY, size);
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

  const handleChangeIndexMobile = (e) => {
    let index = e.target.dataset.index
    if (index == undefined) {
      index = e.target.parentElement.dataset.index
    }
    if (index == 0) {
      if (isSidebarOpen) {
        toggleSidebar()
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const sections = document.querySelectorAll(".section")
      const targetTop = sections[index].getBoundingClientRect().top + scrollY - 20 - 60;
      console.log(targetTop);
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      toggleSidebar()
    }
  }

  const handleSetCurrentPage = (e) => {
    setCurrentPage(e.target.dataset.index)
  }

  return (
    <div ref={headerRef} className={`${styles.header} sm:mt-4`}>
      {React.cloneElement(children, { firstPagePassed, handleChangeIndexMobile, currentPage, handleSetCurrentPage, toggleSidebar, isSidebarOpen, isActive })}
    </div>)

}