import React from 'react';
import styles from "./Header.module.css";
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import DropdownHeaderMenu from '../Dropdown/DropdownHeaderMenu';
import AnimatedMenuItem from './AnimatedMenuItem';

export default function HeaderServerRender({ firstPagePassed, handleSetCurrentPage, handleChangeIndexMobile, currentPage, headerRef, toggleSidebar, isSidebarOpen, isActive }) {

  return (<>
    <header ref={headerRef} className={`${styles.header} sm:mt-4`}>
      <div className='w-full sm:container sm:mx-auto'>
        {/** MOBILE */}
        <div className={`${styles.blur} ${styles.mobileContainer} flex justify-between items-center sm:hidden`}>
          <div className='container flex justify-between items-center'>
            <div className='semibold' data-index="0" onClick={handleChangeIndexMobile}>Tomas Arras</div>
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
              <li data-index="1" onClick={handleChangeIndexMobile}><AnimatedMenuItem isOpen={isSidebarOpen} i={0}>About</AnimatedMenuItem></li>
              <li data-index="2" onClick={handleChangeIndexMobile}><AnimatedMenuItem isOpen={isSidebarOpen} i={1}>Skills</AnimatedMenuItem></li>
              <li data-index="3" onClick={handleChangeIndexMobile}><AnimatedMenuItem isOpen={isSidebarOpen} i={2}>Experience</AnimatedMenuItem></li>
              <li data-index="4" onClick={handleChangeIndexMobile}><AnimatedMenuItem isOpen={isSidebarOpen} i={3}>Portfolio</AnimatedMenuItem></li>
              <li data-index="5" onClick={handleChangeIndexMobile}><AnimatedMenuItem isOpen={isSidebarOpen} i={4}>Contact</AnimatedMenuItem></li>
            </ul>
          </nav>
        </DropdownHeaderMenu>
        {/** DESKTOP */}
        <div className={`${styles.headerWrapper} hidden sm:block relative`}>
          <div className={`${styles.borderContainer} ${isActive && styles.active} absolute w-full h-full`}>
            <div className={`${firstPagePassed && styles.black} w-full h-full ${styles.blur}`}></div>
          </div>
          <div className={`${styles.headerContainer} p-2 ${isActive && styles.visible}`}>
            <div data-index="0" onClick={handleSetCurrentPage} className={`ms-4 cursor-pointer semibold ${styles.logo} ${isActive && styles.visible}`}>Tomas Arras</div>
            <nav className={`hidden sm:block me-4 ${styles.desktopNav} ${isActive && styles.visible}`}>
              <ul>
                <li className={`ms-4 ${currentPage == 1 ? styles.isActive : ""}`} data-index="1" onClick={handleSetCurrentPage}>About</li>
                <li className={`ms-4 ${currentPage == 2 ? styles.isActive : ""}`} data-index="2" onClick={handleSetCurrentPage}>Skills</li>
                <li className={`ms-4 ${currentPage == 3 ? styles.isActive : ""}`} data-index="3" onClick={handleSetCurrentPage}>Experience</li>
                <li className={`ms-4 ${currentPage == 4 ? styles.isActive : ""}`} data-index="4" onClick={handleSetCurrentPage}>Portfolio</li>
                <li className={`ms-4 ${currentPage == 5 ? styles.isActive : ""}`} data-index="5" onClick={handleSetCurrentPage}>Contact</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </>)
}