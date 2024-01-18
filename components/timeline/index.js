import React, { useEffect, useRef } from 'react';
import styles from './WorkTimeline.module.css'
import { motion } from 'framer-motion';

const Badge = ({ children }) => (<span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{children}</span>);

const Item = ({ time, children, title, i, first, last }) => {
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
  return (
  <li className={`${styles.item} ps-4 pe-4 rounded`}>
    <div className={`${styles.itemContainer} ${last ? styles.lastContainer : ""} ${first ? styles.firstContainer : "pt-4"} ps-4 border-s border-gray-200 dark:border-gray-700`}>
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full start-4 ms-1 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        custom={i}
      >
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time}</time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {children}
      </motion.div>
      {/* TODO normal debe ser text-gray-500 y dark 400 */}
    </div>
  </li>)
}

export default function WorkTimeline({ }) {

  return (
    <div>
      {/* TODO: present current month */}
      {/* TODO: Fullstack dev */}
      {/* TODO: check todo */}
      {/* TODO: university */}
      {/* TODO: badges icons */}
        <ol className="relative sm:grid sm:gap-4 sm:grid-cols-2 ">                  
          <Item i={0} time="February 2022 - 2024 (present)" title="Backend developer at CertiSur" first>
            <p className='text-gray-500 dark:text-gray-400 mb-3'>Development of a service with multiserveces and digital signature</p>
            <Badge>Java</Badge>
            <Badge>Spring</Badge>
          </Item>
          {/**TODO: link en ingles https://www.taggify.net/en */}
          <Item i={1} time="September 2021 - February 2022" title={<>FullStack developer at <a href='https://www.taggify.net/en'>Taggify</a></>}>
            <p className='text-gray-500 dark:text-gray-400 mb-3'>
              Development of a service with multiserveces and digital signature
            </p>
            <Badge>Java</Badge>
            <Badge>Spring</Badge>
          </Item>
          <Item i={2} time="January 2021 - September 2021" title={<>FullStack developer at <a href="https://www.ideaas.com.ar/">IDEAAS</a></>}><p className='text-gray-500 dark:text-gray-400 mb-3'>All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p></Item>
          {/**TODO: link en ingles https://www.unicen.edu.ar/english */}
          <Item i={3} time="January 2018 - December 2021" title={<>Graduated from the University of <a href='https://www.unicen.edu.ar/content/tandil'>UNICEN</a> in Tandil, Argentina</>} last><p className='text-gray-500 dark:text-gray-400 mb-3'>Graduated as a Software Developer.</p></Item>
        </ol>


    </div>
  )
}