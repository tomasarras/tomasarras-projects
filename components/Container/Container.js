import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import s from './Container.module.css';

export default function Container({ children, page, center = false, noCenter = false, noPadding = false, className = "" }) {
  const { currentPage } = useContext(Context);
  const isActive = page == undefined || page == currentPage;

  return (
  <section className={`${noPadding ? "" : "container"} sm:py-4 h-100 ${s.section} ${!isActive && s.invisible} ${className}`}>
    {/**TODO: este padding es del header, en mobile no mostrar */}
    <div className={`${noCenter ? s.noCenter : s.div} h-100 flex ${center ? "justify-center items-center" : ""}`}>
      {children}
    </div>
  </section>)
}