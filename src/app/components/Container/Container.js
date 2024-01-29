import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import s from './Container.module.css';

export default function Container({ children, page, fullContainerClassName, noHeaderPadding = false, center = false, noCenter = false, noPadding = false, className = "" }) {
  const { currentPage } = useContext(Context);
  const isActive = page == undefined || page == currentPage;

  return (
  <section className={`${fullContainerClassName} w-full h-full`}>
    <div className={`${noPadding ? "" : "container"} ${noHeaderPadding ? "" : "sm:py-4"} h-full ${s.section} ${!isActive && s.invisible} ${className}`}>
      {/**TODO: este padding es del header, en mobile no mostrar */}
      <div className={`${noHeaderPadding ? "" : noCenter ? s.noCenter : s.div} h-full flex ${center ? "justify-center items-center" : ""}`}>
        {children}
      </div>
    </div>
  </section>
  )
}