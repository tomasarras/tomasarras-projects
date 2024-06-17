"use client"
import React, { useState } from 'react'
import copyIcon from "../../../../public/icons/copy.svg"
import Image from 'next/image'
import Button from './Button'


const ButtonCopyEmail = ({ copyText, copiedText }) => {

	const [copyTextShowing, setCopyTextShowing] = useState(copyText)

	const copyEmail = () => {
		navigator.clipboard.writeText("tomasarras@gmail.com").then(() => {
			setCopyTextShowing(copiedText)
			setTimeout(() => setCopyTextShowing(copyText), 1000)
		}).catch(err => {
			console.error('Failed to copy text: ', err);
		});
	}
  return (
    <Button onClick={copyEmail} tooltip={copyTextShowing}><Image className='h-8 w-8' src={copyIcon} alt={"copy"} width={32} height={32}/></Button>

  )
}

export default ButtonCopyEmail