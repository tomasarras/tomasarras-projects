"use client"
import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/20/solid";
import { MoonIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Image from "next/image";

const DarkModeSwitcher = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return (<div className="ml-2 flex">
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={24}
      height={24}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
    <span className="as-text ml-1 cursor-pointer">{children}</span>
  </div>)

  if (resolvedTheme === 'dark') {
    return <div className="ml-2 flex" onClick={() => setTheme('light')}>
      <MoonIcon className="h-6 w-6 cursor-pointer" />
      <span className="as-text ml-1 cursor-pointer">{children}</span>
    </div>
  }

  if (resolvedTheme === 'light') {
    return <div className="ml-2 flex" onClick={() => setTheme('dark')}>
      <SunIcon className="h-6 w-6 cursor-pointer invert-color" />
      <span className="as-text ml-1 cursor-pointer">{children}</span>
    </div>
  }
}

export default DarkModeSwitcher