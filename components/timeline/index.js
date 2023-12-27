import React, { useEffect, useRef } from 'react';
import styles from './WorkTimeline.module.css'
import { motion } from 'framer-motion';

export default function WorkTimeline({ }) {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
      }
    })
  }

  const Item = ({ time, children, title, i }) => (
  <motion.li
    variants={fadeInAnimationVariants}
    initial="initial"
    whileInView="animate"
    custom={i}
    class={`${styles.item} pb-10 ps-4`}
    >
      <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time}</time>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{children}</p>
  </motion.li>)

  return (
    <div>
      {/* TODO: present current month */}
      {/* TODO: Fullstack dev */}
      {/* TODO: check todo */}
        <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
          <Item i={0} time="February 2022 - 2024 (present)" title="Backend developer at CertiSur">Development of a service with multiserveces and digital signature</Item>
          <Item i={1} time="September 2021 - February 2022" title="FullStack developer at Taggify">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</Item>
          <Item i={2} time="January 2021 - September 2021" title="FullStack developer at IDEAAS">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</Item>
        </ol>


    </div>
  )
}