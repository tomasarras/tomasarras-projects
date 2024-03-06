"use client"
import React, { useContext, useEffect, useRef, useState } from 'react';
import s from "./DesktopAnimation.module.css";
import Image from 'next/image';
import { Context } from '../../Context';
import { motion } from 'framer-motion';
import Dev from '../Icons/Dev/Dev';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { sm } from '../../constants/Constants';
import desktopSvg from "../../../../public/desktop/desktop.svg"
import codeConsole2 from "../../../../public/desktop/background/b2/code_console.svg"
import codeConsole3 from "../../../../public/desktop/background/b3/code_console.svg"
import lines1 from "../../../../public/desktop/background/b1/lines.svg"
import lines2 from "../../../../public/desktop/background/b2/lines.svg"
import b1 from "../../../../public/desktop/background/b4/b1.svg"
import b2 from "../../../../public/desktop/background/b4/b2.svg"
import b5 from "../../../../public/desktop/background/b5/b1.svg"
import b52 from "../../../../public/desktop/background/b5/b2.svg"
import b3Lines from "../../../../public/desktop/background/b3/lines.svg"
import circle from "../../../../public/desktop/background/b6/circle.svg"
import { isDesktop } from '@/app/utils/utils';

export default function DesktopAnimation({ className }) {
  const { currentPage } = useContext(Context);
  const showInPage = 1;
  const size = useWindowDimensions()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const passed = currentPage > showInPage;
  const [isActive, setIsActive] = useState(true)
  const desktopRef = useRef(null)
  const codeVariants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
    },
    hover: {
      scale: 1.05,
      x: -6,
      y: -2,
    }
  }

  const codeAnimation = {
    initial:"initial",
    whileHover:"hover",
    variants: codeVariants
  }

  useEffect(() => {
    if (isDesktop(size)) {
      setIsActive(currentPage >= showInPage)
    } else {
      setIsActive(true)
    }
  }, [currentPage, size])

  useEffect(() => {
    if (desktopRef.current) {
      const elem = desktopRef.current.firstChild
      if (elem.offsetHeight != 0 && elem.offsetWidth != 0) {
        setHeight(elem.offsetHeight + "px")
        setWidth(elem.offsetWidth + "px")
      }
    }
  }, [desktopRef, size])

  const notZero = (number) => number == 0 ? null : number

  return (<>
  <div className={`mx-auto ${s.container} ${isActive ? s.active : ""} ${passed ? s.invisible : ""} ${className}`}>
    <div className='mx-auto' style={{width: notZero(width),height: notZero(height)}}>
      <div style={{width: width,height: height}} className={`absolute`}>
        <div style={{width: "35%", height: "35%"}} className={`${s.item} ${s.console1}`}>
          <div className='absolute w-100 h-full'>
            <Image
              src={codeConsole2}
              alt="Console"
              className={`${s.opacity}`}
            />
            <motion.div {...codeAnimation}>
              <Image
                src={lines1}
                alt="Lines"
                className={`${s.lines}`}
              />
            </motion.div>
          </div>
        </div>

        <div style={{width: "35%", height: "35%"}} className={`${s.item} ${s.console2}`}>
          <div className='absolute w-100 h-full'>
            <Image
              src={codeConsole2}
              alt="Console"
              className={`${s.opacity}`}
            />
            <motion.div {...codeAnimation}>
              <Image
                src={lines2}
                alt="Lines"
                className={`${s.lines}`}
              />
            </motion.div>
          </div>
        </div>

        <div style={{width: "35%", height: "35%"}} className={`${s.item} ${s.console3}`}>
          <div className='absolute w-100 h-full'>
            <Image
              src={codeConsole3}
              alt="Console"
              className={`${s.opacity}`}
            />
            <motion.div {...codeAnimation}>
              <Image
                src={b3Lines}
                alt="Lines"
                className={`${s.lines}`}
              />
            </motion.div>
          </div>
        </div>

        <div style={{width: "35%", height: "35%"}} className={`${s.item} ${s.front1}`}>
          <div className='absolute w-100 h-full'>
            <Image
              src={b2}
              alt="Console"
              className={`${s.opacity}`}
            />
            <motion.div {...codeAnimation}>
              <Image
                src={b1}
                alt="Lines"
                className={`${s.lines}`}
              />
            </motion.div>
          </div>
        </div>

        <div style={{width: "20%", height: "20%"}} className={`${s.item} ${s.front2}`}>
          <div className='absolute w-100 h-full'>
            <Image
              src={b5}
              alt="Console"
              className={`${s.opacity}`}
            />
            <motion.div {...codeAnimation}>
              <Image
                src={b52}
                alt="Lines"
                className={`${s.lines}`}
              />
            </motion.div>
          </div>
        </div>

        <div style={{width: "30%", height: "30%"}} className={`${s.dev}`}>
          <div className={`${s.devShadow} w-100 h-full`}></div>
          <div className='relative w-100 h-full'>
            <Image
              src={circle}
              alt="Lines"
              className={`${s.devImg}`}
            />
            <div className={`${s.devMov} w-100 h-full`}>
              <Dev
                className={`${s.devImg} ${s.devIcon} w-4/5 h-4/5`}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={desktopRef} style={{width: notZero(width)}}>
        <Image
        style={{maxHeight: "80dvh", width:"fit-content"}}
          src={desktopSvg}
          alt="Desktop"
        />
      </div>
    </div>
  </div>
  </>);
}