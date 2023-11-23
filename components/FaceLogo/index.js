import React, { useEffect, useState } from 'react';
import s from "./FaceLogo.module.css";
import Image from 'next/image';


export default function FaceLogo({ size }) {

  return (<>
    <div className={s.faceSwap}>
      {/* <Image
        src="/logo.svg"
        className={s.img1}
        alt="Logo"
        width={200}
        height={200}
      /> */}
      <Image
        src="/logo.svg"
        className={s.img2}
        alt="Logo"
        width={size}
        height={size}
      />
    </div>
  </>)
}