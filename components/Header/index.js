import React, { useEffect, useState } from 'react';
import styles from "./Header.module.css";

export default function Header({ currentIndex }) {

  return (<>
    <header className={`${styles.header} mt-4 ${currentIndex == 0 && 'invisible'}`}>
      <div className={`${styles.headerContainer} p-2`}>
        <div className='ms-4'>Tomas Arras</div>
        <nav className='me-4'>
          <ul>
            <li className='ms-4'>About</li>
            <li className='ms-4'>Experience</li>
            <li className='ms-4'>Skills</li>
            <li className='ms-4'>Portfolio</li>
            <li className='ms-4'>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  </>)
}