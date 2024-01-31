import React from 'react';
import styles from "./Header.module.css";
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import DropdownHeaderMenu from '../Dropdown/DropdownHeaderMenu';
import AnimatedMenuItem from './AnimatedMenuItem';
import HeaderItemScroller from '../ClientSideRendering/HeaderItemScroller';
import HeaderSidebarToggler from '../ClientSideRendering/HeaderSidebarToggler';
import HeaderHamburgerIcon from '../ClientSideRendering/HeaderHamburgerIcon';
import HeaderItemScrollerDesktop from '../ClientSideRendering/HeaderItemScrollerDesktop';
import LogoDisplacementAnimation from '../ClientSideRendering/LogoDisplacementAnimation';
import HeaderDisplacementAnimation from '../ClientSideRendering/HeaderDisplacementAnimation';
import HeaderLiDesktopColor from '../ClientSideRendering/HeaderLiDesktopColor';
import HeaderLineDisplacement from '../ClientSideRendering/HeaderLineDisplacement';

export default function HeaderServerRender({ firstPagePassed, isActive }) {

  return (
  <header className='w-full h-full'>
    <div className='w-full sm:container sm:mx-auto'>
      {/** MOBILE */}
      <div className={`${styles.blur} ${styles.mobileContainer} flex justify-between items-center sm:hidden`}>
        <div className='container flex justify-between items-center'>
          <HeaderItemScroller index={0}><div className='semibold'>Tomas Arras</div></HeaderItemScroller>
          
          <HeaderSidebarToggler>
            <div className="h-6 w-8">
              <HeaderHamburgerIcon/>
            </div>
          </HeaderSidebarToggler>
        </div>
      </div>
      <DropdownHeaderMenu>
        <nav>
          <ul className={`${styles.dropdownMobile} flex flex-col divide-y w-full items-end`}>
            <li><AnimatedMenuItem i={0}>About</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={1}>Skills</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={2}>Experience</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={3}>Portfolio</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={4}>Contact</AnimatedMenuItem></li>
          </ul>
        </nav>
      </DropdownHeaderMenu>
      {/** DESKTOP */}
      <div className={`${styles.headerWrapper} hidden sm:block relative`}>
        <HeaderLineDisplacement/>
        <div className={`${styles.headerContainer} p-2 ${isActive && styles.visible}`}>
          <HeaderItemScrollerDesktop index={0}>
            <LogoDisplacementAnimation>
              <div className={`ms-4 cursor-pointer semibold`}>Tomas Arras</div>
            </LogoDisplacementAnimation>
          </HeaderItemScrollerDesktop>
          <HeaderDisplacementAnimation>
            <nav className={`hidden sm:block me-4 `}>
              <ul>
                <li className={`ms-4`}><HeaderLiDesktopColor index={1}><span>About</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={2}><span>Skills</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={3}><span>Experience</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={4}><span>Portfolio</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={5}><span>Contact</span></HeaderLiDesktopColor></li>
              </ul>
            </nav>
          </HeaderDisplacementAnimation>
        </div>
      </div>
    </div>
  </header>)
}