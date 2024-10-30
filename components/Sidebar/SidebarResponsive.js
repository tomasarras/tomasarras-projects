import React from 'react';
import s from './SidebarResponsive.module.css'
import { useWindowSize } from '@uidotdev/usehooks';

export default function SidebarResponsive({ isOpen, onClose, children }) {
  const size = useWindowSize();

  
  return (<> {size.width <= 576 &&
    <div className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      {children}
    </div>
  }
  </>)
}