import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import styles from "./Contact.module.css"
import Image from 'next/image';
import contactImg from "../../../public/portrait/contact.png"
import AnimationHandler from '../../Utils/AnimationHandler';
import { isDesktop } from '../../../utils/utils';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

export default function Contact({ innerRef }) {
  const animation = useAnimationScroll(4)
  const size = useWindowDimensions()
  const images = [
    // "/portrait/dark/APC_0009_fade.png",
    // "/portrait/dark/APC_0009_no_fade.png",
    // "/portrait/dark/APC_0010_fade.png",
    // "/portrait/dark/APC_0010_no_fade.png",
    // "/portrait/dark/APC_0031_fade.png",
    // "/portrait/dark/APC_0031_no_fade.png",
    // "/portrait/dark/APC_0032_fade.png",
    // "/portrait/dark/APC_0032_no_fade.png",
    // "/portrait/dark/APC_0037_fade.png",
    // "/portrait/dark/APC_0037_no_fade.png",
    // "/portrait/dark/APC_0041_fade.png",
    // "/portrait/dark/APC_0041_no_fade.png",
    // "/portrait/dark/APC_0042_fade.png",
    // "/portrait/dark/APC_0042_no_fade.png",
    // "/portrait/dark/APC_0043_fade.png",
    "/portrait/dark/APC_0043_no_fade.png",//
    // "/portrait/dark/APC_0044_fade.png",
    // "/portrait/dark/APC_0044_no_fade.png",
    // "/portrait/dark/APC_0050_fade.png",
    // "/portrait/dark/APC_0050_no_fade.png",
    // "/portrait/dark/APC_0051_fade.png",
    // "/portrait/dark/APC_0051_no_fade.png",
    // "/portrait/dark/APC_0053_fade.png",
    // "/portrait/dark/APC_0053_no_fade.png",
    // "/portrait/dark/APC_0057_fade.png",
    // "/portrait/dark/APC_0057_no_fade.png",

    // "/portrait/lighted/APC_0059_fade_1.png",    
    // "/portrait/lighted/APC_0059_fade_2.png",    
    // "/portrait/lighted/APC_0059_no_fade.png",    
    // "/portrait/lighted/APC_0064_fade_1.png",    
    // "/portrait/lighted/APC_0064_fade_2.png",    
    // "/portrait/lighted/APC_0064_no_fade.png",  
    // "/portrait/lighted/APC_0068_fade_1.png",    
    // "/portrait/lighted/APC_0068_fade_2.png",    
    // "/portrait/lighted/APC_0068_fade_3.png",    
    // "/portrait/lighted/APC_0068_no_fade.png", 
    // "/portrait/lighted/APC_0059_fade_1.png",    
    // "/portrait/lighted/APC_0059_fade_2.png",    
    // "/portrait/lighted/APC_0059_no_fade.png",   
    // "/portrait/lighted/APC_0059_no_fade_2.png",   
    // "/portrait/lighted/APC_0070_fade_1.png",    
    // "/portrait/lighted/APC_0070_fade_2.png",    
    // "/portrait/lighted/APC_0070_no_fade.png", // ESTA
    // "/portrait/lighted/APC_0073_fade_1.png",    
    // "/portrait/lighted/APC_0073_fade_2.png",    
    // "/portrait/lighted/APC_0073_no_fade.png", 
    
    // "/portrait/perfil/APC_0054_fade.png",    
    // "/portrait/perfil/APC_0054_no_fade.png",    
    
    // "/portrait/perfillight/APC_0071_fade.png",    
    // "/portrait/perfillight/APC_0071_no_fade.png",    
    // "/portrait/perfillight/APC_0072.png",    //ESTA
    
  ]
  return (
    <div ref={innerRef} className={`align-center flex flex-col sm:flex-row justify-between items-center`}>
      <div {...animation} className='w-full sm:w-6/12'>
        <p>What would you do if you had a software expert available at your fingertips?

          Want to start new project? Or just say hey.
          You can also follow me on Instagram.
          tomasarras@gmail.com
        </p>
      </div>
      <AnimationHandler className='w-full sm:w-6/12 d-flex justify-center' isAnimationEnabled={isDesktop(size)} {...animation}>
        <div className={`${styles.imageContainer} flex justify-center items-center w-8/12`}>
          {/* TODO: quitarle gradiente y ver si la imagen esta bien */}
          {/* TODO: next image loader */}
          <Image priority alt="Tomas Arras" src={contactImg}/>
        </div>
      </AnimationHandler>
    </div>);
}