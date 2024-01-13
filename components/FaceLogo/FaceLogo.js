import React, { useEffect, useState } from 'react';
import s from "./FaceLogo.module.css";
import Image from 'next/image';


export default function FaceLogo({ size }) {

  return (<>
    <div style={{width: size+"px"}}>
      <Image
        src="/logo.svg"
        priority
        className="invert-color"
        alt="Logo"
        width={size}
        height={size}
      />
    </div>
  </>)
}