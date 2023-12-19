import React, { useEffect, useState } from 'react';
import s from "./FaceLogo.module.css";
import Image from 'next/image';


export default function FaceLogo({ size }) {

  return (<>
    <div style={{width: size+"px"}} className={s.faceSwap}>
      <Image
        src="/logo.svg"
        className={s.img}
        alt="Logo"
        width={size}
        height={size}
      />
    </div>
  </>)
}