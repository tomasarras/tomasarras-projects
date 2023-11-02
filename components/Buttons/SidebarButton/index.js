import React, { useEffect, useState } from 'react';
import ArrowLeft from '../../../components/Icons/ArrowLeft';
import s from "./SidebarButton.module.css";

export default function SidebarButton({ isSidebarOpen, onClick }) {

  return (<>
    <button className={`bg-black btn-unset ${s.animation} ${isSidebarOpen ? "" : "r-180" }`} onClick={onClick}>
      <ArrowLeft className={`icon-xxl`}/>
    </button>
  </>)
}