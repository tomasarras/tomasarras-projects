import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import githubIcon from "../../../../public/icons/github-white.svg"
import rightArrow from "../../../../public/icons/right-arrow.svg"
import styles from "./GitHubButtonLink.module.css"

export default function GitHubButtonLink({ link, className }) {

  return (<>
    {/*TODO: COLOR ARROW*/}
    <a href={link} className={`flex items-center link ${styles.anchor} ${className}`}><Image className='h-8 w-8 me-2' src={githubIcon} alt="github-icon"/> Ver codigo <Image className={`h-4 w-4 invert-color ml-2 ${styles.arrow}`} src={rightArrow} alt="right-arrow" /></a>
  </>)
}