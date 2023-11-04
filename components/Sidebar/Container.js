import React from 'react';
import s from './Container.module.css'

export default function SidebarContainer({ children }) {

  
  return (<>
    <div className={`${s.container}`}>
      {children}
    </div>
  </>)
}