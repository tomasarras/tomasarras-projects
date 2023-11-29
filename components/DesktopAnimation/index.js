import React, { useContext, useEffect, useState } from 'react';
import s from "./DesktopAnimation.module.css";
import Image from 'next/image';
import { Context } from '../../Context';

export default function DesktopAnimation({ width, height }) {
  const { currentPage } = useContext(Context);
  const showInPage = 1;
  const passed = currentPage > showInPage;
  const isActive = currentPage >= showInPage;

  return (<>
  <div style={{width, height}} className={`${s.container} ${isActive ? s.active : ""} ${passed ? s.invisible : ""}`}>
    <div className={`${s.layer1} ${s.layer}`}>
      <Image
        src="/desktop/desktop.svg"
        alt="Desktop"
        width={width}
        height={width}
      />
    </div>
    <div className={`${s.layer2} ${s.layer}`}>
      <div style={{width, height}} className={`${s.item} ${s.console1}`}>
        <Image
          src="/desktop/background/b1/code_console2.svg"
          alt="Console"
          className={`${s.opacity}`}
          width={width * 0.45}
          height={width * 0.45}
        />
        <Image
          src="/desktop/background/b1/lines.svg"
          alt="Lines"
          className={`${s.lines}`}
          width={width * 0.45}
          height={width * 0.45}
        />
      </div>

      <div style={{width, height}} className={`${s.item} ${s.console2}`}>
        <Image
          src="/desktop/background/b2/code_console.svg"
          alt="Console"
          className={`${s.opacity}`}
          width={width * 0.35}
          height={width * 0.35}
        />
        <Image
          src="/desktop/background/b2/lines.svg"
          alt="Lines"
          className={`${s.lines}`}
          width={width * 0.35}
          height={width * 0.35}
        />
      </div>

      <div style={{width, height}} className={`${s.item} ${s.console3}`}>
        <Image
          src="/desktop/background/b3/code_console.svg"
          alt="Console"
          className={`${s.opacity}`}
          width={width * 0.35}
          height={width * 0.35}
        />
        <Image
          src="/desktop/background/b3/lines.svg"
          alt="Lines"
          className={`${s.lines}`}
          width={width * 0.35}
          height={width * 0.35}
        />
      </div>

      <div style={{width, height}} className={`${s.item} ${s.front1}`}>
        <Image
          src="/desktop/background/b4/b2.svg"
          alt="Console"
          className={`${s.opacity}`}
          width={width * 0.35}
          height={width * 0.35}
        />
        <Image
          src="/desktop/background/b4/b1.svg"
          alt="Lines"
          className={`${s.lines}`}
          width={width * 0.35}
          height={width * 0.35}
        />
      </div>

      <div style={{width, height}} className={`${s.item} ${s.front2}`}>
        <Image
          src="/desktop/background/b5/b1.svg"
          alt="Console"
          className={`${s.opacity}`}
          width={width * 0.15}
          height={width * 0.15}
        />
        <Image
          src="/desktop/background/b5/b2.svg"
          alt="Lines"
          className={`${s.lines}`}
          width={width * 0.15}
          height={width * 0.15}
        />
      </div>

      <div style={{width, height}} className={`${s.dev}`}>
        <div style={{width: width * 0.20, height: width * 0.20}} className={s.devShadow}></div>
        <Image
          src="/desktop/background/b6/circle.svg"
          alt="Lines"
          className={`${s.devImg}`}
          width={width * 0.20}
          height={width * 0.20}
        />
        <Image
          src="/desktop/background/b6/dev.svg"
          alt="dev"
          className={`${s.devImg} ${s.devMov}`}
          width={width * 0.20}
          height={width * 0.20}
        />
      </div>
    </div>
  </div>
  </>);
}