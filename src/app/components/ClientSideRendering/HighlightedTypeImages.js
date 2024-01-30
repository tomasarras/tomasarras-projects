"use client"
import React, { useContext } from 'react'
import styles from "./HighlightedTypeImages.module.css"
import { Context } from '@/app/Context'

export const HighlightedTypeImages = ({ children }) => {
	const childrenArray = React.Children.toArray(children)
	const { skillsHighlightedType } = useContext(Context)

  return (
    <>
			<div className={`${styles.imgDecoration} ${skillsHighlightedType === null || skillsHighlightedType == "frontend" ? styles.active : ""}`}>{childrenArray[0]}</div>
			<div className={`${styles.imgDecoration} ${skillsHighlightedType === null || skillsHighlightedType == "devops" ? styles.active : ""}`}>{childrenArray[1]}</div>
			<div className={`${styles.imgDecoration} ${skillsHighlightedType === null || skillsHighlightedType == "backend" ? styles.active : ""}`}>{childrenArray[2]}</div>
		</>
  )
}