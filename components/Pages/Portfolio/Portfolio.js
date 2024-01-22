import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import styles from "./Portfolio.module.css"
import Image from 'next/image';
import contactImg from "../../../public/portrait/contact.png"
import AnimationHandler from '../../Utils/AnimationHandler';
import { isDesktop } from '../../../utils/utils';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Link from 'next/link';
import instagramIcon from "../../../public/icons/instagram-white.svg"
import githubIcon from "../../../public/icons/github-white.svg"
import linkedInIcon from "../../../public/icons/linkedin-white.svg"

export default function Portfolio({ innerRef }) {
  const animation = useAnimationScroll(4)
  const size = useWindowDimensions()

  return <div ref={innerRef} className={``}>
  <AnimationHandler
    {...animation}
    className={`${styles.textContainer} flex flex-column justify-center items-center`}
  >
    <div className='flex flex-col sm:w-6/12 md:w-5/12 2xl:w-4/12'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='mb-4 text-5xl font-bold'>Portfolio</h1>
        <div className='title-underline'></div>
      </div>
      <p className='mt-6'>He desarrollado distintos tipos de aplicaciones, con distintas tecnologias, con aplicaciones web interactivas construidas con tecnologías front-end como React y Angular. Estos proyectos reflejan mi destreza técnica y también mi enfoque en crear soluciones orientadas al usuario, siempre manteniendo un estándar de código limpio y modular.</p>
    </div>
  </AnimationHandler>
</div>
  
}