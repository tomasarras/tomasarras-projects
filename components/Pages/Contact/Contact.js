import React, { useEffect, useState } from 'react';
import DesktopAnimation from '../../DesktopAnimation';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import styles from "./Contact.module.css"

export default function Contact() {
  const size = useWindowDimensions()
  const animation = useAnimationScroll(1)

  return (
    <div className={`container-100dvh align-center d-flex justify-between items-center`}>
      <div {...animation} className='w-6/12'>
        <p>What would you do if you had a software expert available at your fingertips?

Want to start new project? Or just say hey.
You can also follow me on Instagram.
tomasarras@gmail.com</p>
      </div>
      <div className='w-6/12 d-flex justify-center'>
        Imagen
      </div>
    </div>);
}