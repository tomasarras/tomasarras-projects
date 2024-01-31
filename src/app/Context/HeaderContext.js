"use client"
import React, { createContext, useRef, useState } from "react";
import { useToggle } from "../hooks/useToggle";

export const Context = createContext();

export const HeaderProvider = ({ children }) => {
	const [isSidebarOpen, toggleSidebar] = useToggle()
  const [isActive, setIsActive] = useState(false)
  const [firstPagePassed, setFirstPagePassed] = useState(false);

	const handleChangeIndexMobile = (index) => {
    if (index == 0) {
      if (isSidebarOpen) {
        toggleSidebar()
      }
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      const sections = document.querySelectorAll(".section")
      const targetTop = sections[index-1].getBoundingClientRect().top + scrollY - 20 - 60;
      setTimeout(() => {
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }, 100);
      toggleSidebar()
    }
  }
    
    
    
	return (<Context.Provider value={{
		handleChangeIndexMobile,
		toggleSidebar,
		isSidebarOpen,
    isActive,
    setIsActive,
    firstPagePassed,
    setFirstPagePassed,
	}}>
		{children}
	</Context.Provider>);
}