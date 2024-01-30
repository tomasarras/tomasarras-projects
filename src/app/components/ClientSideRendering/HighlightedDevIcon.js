"use client"
import React, { useContext } from 'react'
import { Context } from '@/app/Context'
import styles from "./HighlightedTypeImages.module.css"

export const HighlightedDevIcon = ({ children, type }) => {
	const { skillsHighlightedType, setSkillsHighlightedType } = useContext(Context)

  return (
    <div
			className={`${skillsHighlightedType === type ? styles.activeImg : ""} ${styles.noActiveDevIcon}`}	
			onMouseEnter={() => setSkillsHighlightedType(type)}
			onMouseLeave={() => setSkillsHighlightedType(null)}>
				{children}
		</div>
  )
}