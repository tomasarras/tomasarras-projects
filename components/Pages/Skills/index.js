import React, { useState } from 'react';
import styles from './Skills.module.css';
import Chart from '../../Chart';
import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Skills() {
  const chartContainerRef = useRef(null);
  const [highlightedType, setHighlightedType] = useState(null);
  const chartContainerWidth = chartContainerRef?.current?.getBoundingClientRect()?.width;
  const devIconSize = 60;
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
  const devIcons1 = [{
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
];
  const devIcons2 = [{
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
      <div className='w-100 h-100 align-center d-flex justify-between items-center'>
        <div className='w-5/12'>
          <div className='d-flex items-center w-100 flex-column mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>Skills</h1>
            <div className='title-underline'></div>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
        </div>
        <div className='w-7/12 d-flex justify-center items-center h-full'>
          <div className='w-6/12' ref={chartContainerRef} style={{height: chartContainerWidth}}>
            <Chart activeChart={highlightedType} size={chartContainerWidth != undefined ? chartContainerWidth : 200}/>
          </div>
        </div>
      </div>
      <div className={`w-full ${styles.icons}`}>
        <div className='d-flex justify-center w-full items-center mb-4'>
          {devIcons1.map((icon, index) => (
            <motion.div
              className='d-flex flex-col'
              variants={fadeInAnimationVariants}
              key={icon.src}
              initial="initial"
              whileInView="animate"
              custom={index}
            >
              <Image
                src={"/icons/" + icon.src}
                className={`mx-4 ${highlightedType === icon.type ? styles.active : ""}`}
                alt="icon"
                width={devIconSize}
                height={devIconSize}
                onMouseEnter={() => setHighlightedType(icon.type)}
                onMouseLeave={() => setHighlightedType(null)}
              />
              <span className={`text-center ${highlightedType === icon.type ? "" : styles.invisible} ${styles.iconLabel}`}>{icon.name}</span>
            </motion.div>))}
        </div>
        <div className='d-flex justify-center w-full items-center'>
          {devIcons2.map((icon, index) => (
            <motion.div
              className='d-flex flex-col'
              variants={fadeInAnimationVariants}
              key={icon.src}
              initial="initial"
              whileInView="animate"
              custom={index}
            >
              <Image
              src={"/icons/" + icon.src}
              className={`mx-4 ${highlightedType === icon.type ? styles.active : ""}`}
              alt="icon"
              width={devIconSize}
              height={devIconSize}
              onMouseEnter={() => setHighlightedType(icon.type)}
              onMouseLeave={() => setHighlightedType(null)}
            />
            <span className={`text-center ${highlightedType === icon.type ? "" : styles.invisible} ${styles.iconLabel}`}>{icon.name}</span>
          </motion.div>))}
        </div>
      </div>
    </div>
    
  );
}