import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import s from './Container.module.css';

export default function Container({ children, page }) {
  const { currentPage } = useContext(Context);
  const isActive = page == undefined || page == currentPage;

  return (
  <section className={`container py-4 h-100 ${s.section} ${!isActive && s.invisible}`}>
    <div style={{ padding: "60px 0"}} className='h-100'>
      {children}
    </div>
  </section>)
}