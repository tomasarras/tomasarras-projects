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
import LanguageDropdown from '../ClientSideRendering/LanguageDropdown';
import { useTranslations } from 'next-intl';
import HeaderLineDisplacement from '../ClientSideRendering/HeaderLineDisplacement';
import Link from 'next/link';

export default function HeaderServerRender() {
  const t = useTranslations("Header")

  return (
  <header className={`w-full h-full ${styles.mainHeaderContainer}`}>
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
            <li><AnimatedMenuItem i={0}>{t("about")}</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={1}>{t("skills")}</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={2}>{t("experience")}</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={3}>{t("portfolio")}</AnimatedMenuItem></li>
            <li><AnimatedMenuItem i={4}>{t("contact")}</AnimatedMenuItem></li>
            {/**TODO: pretty this */}
            <li><Link href={"/es"}>ES</Link></li>
            <li><Link href={"/en"}>EN</Link></li>
          </ul>
        </nav>
      </DropdownHeaderMenu>
      {/** DESKTOP */}
      <div className={`${styles.headerWrapper} hidden sm:block relative`}>
        <HeaderLineDisplacement/>
        <div className={`${styles.headerContainer} p-2`}>
          <HeaderItemScrollerDesktop index={0}>
            <LogoDisplacementAnimation>
              <div className={`ms-4 cursor-pointer semibold`}>Tomas Arras</div>
            </LogoDisplacementAnimation>
          </HeaderItemScrollerDesktop>
          <HeaderDisplacementAnimation>
            <nav className={`hidden sm:block me-4`}>
              <ul>
                <li className={`ms-4`}><HeaderLiDesktopColor index={1}><span>{t("about")}</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={2}><span>{t("skills")}</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={3}><span>{t("experience")}</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={4}><span>{t("portfolio")}</span></HeaderLiDesktopColor></li>
                <li className={`ms-4`}><HeaderLiDesktopColor index={5}><span>{t("contact")}</span></HeaderLiDesktopColor></li>
              </ul>
            </nav>
          </HeaderDisplacementAnimation>
        </div>
      </div>
    </div>
  </header>)
}