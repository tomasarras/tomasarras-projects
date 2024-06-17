"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Tooltip } from 'react-tooltip'
import s from "./Button.module.css"

const Button = ({ children, tooltip, ...props }) => {
	const { resolvedTheme } = useTheme()
  return (<>
    <button
      data-tooltip-variant={resolvedTheme}
      data-tooltip-id="my-tooltip"
      data-tooltip-place="top"
      data-tooltip-content={tooltip}
      type='button'
      className={`bg-accent rounded p-1 hover:bg-accent-light ${s.button}`}
      {...props}
      >
        {children}
    </button>
    <Tooltip id="my-tooltip" />
  </>
  )
}

export default Button