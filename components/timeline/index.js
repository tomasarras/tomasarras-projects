import React, { useEffect, useRef } from 'react';
import styles from './WorkTimeline.module.css'

export default function WorkTimeline({ }) {

    const Item = ({ time, children, title }) => <li class={`${styles.item} mb-10 ms-4`}>
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time}</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{children}</p>
    </li>

  return (
    <div>
      {/* TODO: present current month */}
      {/* TODO: Fullstack dev */}
      {/* TODO: check todo */}
        <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
            <Item time="February 2022 - 2024 (present)" title="Backend developer at CertiSur">Development of a service with multiserveces and digital signature</Item>
            <Item time="September 2021 - February 2022" title="FullStack developer at Taggify">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</Item>
            <Item time="January 2021 - September 2021" title="FullStack developer at IDEAAS">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</Item>
        </ol>


    </div>
  )
}