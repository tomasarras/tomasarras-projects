import React from 'react';
import s from './SidebarResponsive.module.css'
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function SidebarResponsive({ isOpen, onClose, children }) {
  const size = useWindowDimensions();
  
  return (<> {size.width <= 576 &&
    <div className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      {children}
    </div>
  }
  </>)
}