import React from 'react';
import s from './Sidebar.module.css'
import { useWindowSize } from '@uidotdev/usehooks';

export default function Sidebar({ isOpen, children }) {
  const size = useWindowSize();
  
  return (<> {size.width > 576 &&
    <div className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      {children}
    </div>
  }
  </>);
}