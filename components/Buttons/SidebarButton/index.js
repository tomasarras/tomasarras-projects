import React, { useEffect, useState } from 'react';
import ArrowLeft from '../../../components/Icons/ArrowLeft';
import s from "./SidebarButton.module.css";

export default function SidebarButton({ isSidebarOpen, onClick, className }) {

  return (<>
    <button className={`bg-black btn-unset ${className}`} onClick={onClick}>
      <ArrowLeft className={`icon-xxl ${s.animation} ${isSidebarOpen ? "" : "r-180" }`}/>
    </button>
  </>)
}