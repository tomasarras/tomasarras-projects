import React from 'react';
import s from './Sidebar.module.css'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { sm } from '../../constants/Constants';

export default function Sidebar({ isOpen, children }) {
  const size = useWindowDimensions();
  
  return (<> {size.width > sm &&
    <div className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      {children}
    </div>
  }
  </>);
}