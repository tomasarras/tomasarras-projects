import React from 'react';
import s from './Sidebar.module.css'
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function Sidebar({ isOpen, children }) {
  const size = useWindowDimensions();
  
  return (<> {size.width > 576 &&
    <div className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      {children}
    </div>
  }
  </>);
}