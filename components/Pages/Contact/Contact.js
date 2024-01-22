import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import styles from "./Contact.module.css"
import Image from 'next/image';
import contactImg from "../../../public/portrait/contact.png"
import AnimationHandler from '../../Utils/AnimationHandler';
import { isDesktop } from '../../../utils/utils';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Link from 'next/link';
import instagramIcon from "../../../public/icons/instagram-white.svg"
import githubIcon from "../../../public/icons/github-white.svg"
import linkedInIcon from "../../../public/icons/linkedin-white.svg"

export default function Contact({ innerRef }) {
  const animation = useAnimationScroll(5)
  const size = useWindowDimensions()
  const icons = [
    {
      name: "Instagram",
      src: instagramIcon,
      href: "https://www.instagram.com/tomasarras/",
      alt: "instagram"
    },
    {
      name: "GitHub",
      src: githubIcon,
      href: "https://github.com/tomasarras",
      alt: "github"
    },
    {
      name: "LinkedIn",
      src: linkedInIcon,
      href: "https://www.linkedin.com/in/tomas-arras-49b1aa1b6/",
      alt: "linkedin"
    },
    // {
    //   name: "Email",
    //   src: githubIcon,
    //   href: "https://github.com/tomasarras"
    // }
  ]
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
{/**md:col-start-7 md:col-span-6 
            lg:col-start-6 lg:col-span-7 
            xl:col-start-6 xl:col-span-7
            2xl:col-start-6 2xl:col-span-7  */}
  return <div ref={innerRef} className={`grid grid-cols-1 md:gap-4 md:grid-cols-12`}>
  <AnimationHandler
    {...animation}
    className={`${styles.textContainer} flex flex-column justify-center
    col-span-12  
    md:col-span-7 
    lg:col-span-6 
    xl:col-span-5 
    2xl:col-span-4`}
  >
    <p className='mb-6'>Siente total libertad de contactarme para discutir proyectos emocionantes, oportunidades de colaboración o simplemente para saludar. Estoy aquí para ti.</p>
    <h3>Social</h3>
    <div className={`flex mt-2`}>
      {/**TODO hover */}
      {icons.map(icon => <Link key={icon.href} href={icon.href} passHref><Image className='h-10 w-10 me-2' src={icon.src} alt={icon.alt} width={40} height={40}/></Link>)}
    </div>
  </AnimationHandler>
  <AnimationHandler className={`${styles.imageWrapper} flex md:mt-0 col-span-1 md:flex col-start-7 col-span-6 md:col-span-5 lg:col-span-6 lg:col-start-7 flex-column items-center justify-center w-full`} isAnimationEnabled={isDesktop(size)} {...animation}>
    <div className={`${styles.imageContainer} flex justify-center items-center w-8/12`}>
      {/* TODO: quitarle gradiente y ver si la imagen esta bien */}
      {/* TODO: next image loader */}    
      <Image priority alt="Tomas Arras" src={contactImg}/>
    </div>
  </AnimationHandler>
</div>
  
}