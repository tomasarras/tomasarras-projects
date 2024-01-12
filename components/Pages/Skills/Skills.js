import React, { useState, useContext } from 'react';
import styles from './Skills.module.css';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import { Context } from '../../../Context';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { animationScrollDuration } from '../../../constants/Constants';

export default function Skills() {
  const [highlightedType, setHighlightedType] = useState(null);
  const { currentPage } = useContext(Context)
  const animation = useAnimationScroll(2);
  const size = useWindowDimensions()
  const devIconSize = 60;
  const imgDecorationAnimation = {
    y: currentPage === 2 ? 0 : currentPage === 1 ? size.height /10 : size.height /10 *-1,
  }
  const dotsDecorationAnimation = {
    y: currentPage === 2 ? 0 : currentPage === 1 ? size.height /10 *-1 : size.height /10,
  }
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      }
    })
  }
  const devIcons = [{
    src: "react.svg",
    name: "React",
    type: "frontend",
  },
  {
    src: "vue.svg",
    name: "Vue",
    type: "frontend",
  },
  {
    src: "bootstrap.svg",
    name: "Bootstrap",
    type: "frontend",
  },
  {
    src: "tailwind.svg",
    name: "Tailwind",
    type: "frontend",
  },
  {
    src: "docker.svg",
    name: "Docker",
    type: "devops",
  },
  {
    src: "git.svg",
    name: "Git",
    type: "devops",
  },
  {
    src: "postgresql.svg",
    name: "PostgreSQL",
    type: "backend",
  },
  {
    src: "postman.svg",
    name: "Postman",
    type: "backend",
  },
  {
    src: "spring.svg",
    name: "Spring",
    type: "backend",
  },
  {
    src: "java.svg",
    name: "Java",
    type: "backend",
  },
  {
    src: "aws.svg",
    name: "AWS",
    type: "devops",
  },
  {
    src: "jenkins.svg",
    name: "Jenkins",
    type: "devops",
  }];

  return (
    <div className='w-100 h-100 align-center flex-col d-flex justify-between items-center'>
      <div className='w-100 h-100 align-center grid gap-4 grid-cols-12 justify-between items-center'>
        <motion.div {...animation} className='col-span-4'>
          <div className='d-flex items-center w-100 flex-column mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>Skills</h1>
            <div className='title-underline'></div>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
        </motion.div>
        <div className='col-start-6 col-span-8 d-flex justify-center items-center h-full'>
          <div className={`w-full`}>
            <div className='relative top-0'>
              <motion.div animate={dotsDecorationAnimation} transition={{ duration: animationScrollDuration / 1000 }} className={`${styles.dots} absolute`}>
                <Image className={`invisible`} src={"/frontend-resize.png"} width={2969} height={1236} alt='invisible'/>
              </motion.div>
              <motion.div animate={imgDecorationAnimation} transition={{ duration: animationScrollDuration / 1000 }}>
                <Image className={`${styles.imgDecoration} ${highlightedType === null || highlightedType == "frontend" ? styles.active : ""} ml-10`} src={"/frontend-resize.png"} width={2969} height={1236} alt='backend'/>
                <Image className={`${styles.imgDecoration} ${highlightedType === null || highlightedType == "devops" ? styles.active : ""} absolute top-0 ml-10`} src={"/devops-resize.png"} width={2969} height={1236} alt='backend'/>
                <Image className={`${styles.imgDecoration} ${highlightedType === null || highlightedType == "backend" ? styles.active : ""} absolute top-0 ml-10`} src={"/backend-resize.png"} width={2969} height={1236} alt='backend'/>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full ${styles.icons}`}>
        <div className={`grid gap-4 grid-cols-6 mx-auto ${styles.iconsContainer}`}>
          {devIcons.map((icon, index) => (
            <motion.div
              className='d-flex flex-col justify-center items-center'
              variants={fadeInAnimationVariants}
              key={icon.src}
              initial="initial"
              whileInView="animate"
              custom={index}
            >
              <div style={{width: devIconSize, height: devIconSize}} className='flex justify-center items-center'>
                <img
                  src={"/icons/" + icon.src}
                  className={`${highlightedType === icon.type ? styles.active : ""}`}
                  alt="icon"
                  onMouseEnter={() => setHighlightedType(icon.type)}
                  onMouseLeave={() => setHighlightedType(null)}
                />
              </div>
              <span className={`text-center ${highlightedType === icon.type ? "" : styles.invisible} ${styles.iconLabel}`}>{icon.name}</span>
            </motion.div>))}
        </div>
      </div>
    </div>
    
  );
}