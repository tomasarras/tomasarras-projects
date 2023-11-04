import React, { useEffect, useState } from 'react';
import s from "./Switch.module.css";

export default function Switch({ isOn, onSwitch, rotate = false }) {

  return (<>
    <span className={`${s["switch"]} ${rotate ? "" : "r-90"}`}>
      <span className={`${s["switch-border-1"]}`}>
        <span className={`${s["switch-border2"]}`}>
          <input className={s.input} id="switch" onChange={onSwitch} type="checkbox" checked={isOn} />
          <label className={s.input} htmlFor="switch"></label>
          <span className={`${s["switch-top"]}`}></span>
          <span className={`${s["switch-shadow"]}`}></span>
          <span className={`${s["switch-handle"]}`}></span>
          <span className={`${s["switch-handle-left"]}`}></span>
          <span className={`${s["switch-handle-right"]}`}></span>
          <span className={`${s["switch-handle-top"]}`}></span>
          <span className={`${s["switch-handle-bottom"]}`}></span>
          <span className={`${s["switch-handle-base"]}`}></span>
          <span className={`${s["switch-led"]} ${s["switch-led-green"]}`}>
            <span className={`${s["switch-led-border"]}`}>
              <span className={`${s["switch-led-light"]}`}>
                <span className={`${s["switch-led-glow"]}`}></span>
              </span>
            </span>
          </span>
          <span className={`${s["switch-led"]} ${s["switch-led-red"]}`}>
            <span className={`${s["switch-led-border"]}`}>
              <span className={`${s["switch-led-light"]}`}>
                <span className={`${s["switch-led-glow"]}`}></span>
              </span>
            </span>
          </span>
        </span>
      </span>
    </span>

  </>)
}