"use client"
import React, { useContext } from 'react'
import { Context } from '@/app/Context'
import styles from "./HighlightedTypeImages.module.css"

export const SkillsIconLabel = ({ children, type }) => {
	const { skillsHighlightedType } = useContext(Context)

  return (
    <div className={`${skillsHighlightedType === type ? "" : styles.invisible} ${styles.iconLabel}`}>
			{children}
		</div>
  )
}