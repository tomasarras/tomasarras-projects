import React from 'react';
import s from './Sidebar.module.css'

export default function Sidebar({ isOpen, onClose, children }) {

  
  return (<>
    <div className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      {children}
    </div>
  </>)
}