import React from 'react'

export const AlertTimer = ({ notification }) => {
  return (
    <div className="position-absolute w-full max-w-md bg-white shadow-[0.8rem_1rem_0.5rem_rgba(0,0,0,0.1)]">
			<div className="flex items-center justify-between px-4 py-4 gap-2">
				<div className="text-green-500 text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg></div>
				<h2 className="text-sm text-green-500 font-semibold">{notification}</h2>
				<div className="close"><iconify-icon className="text-2xl text-slate-300 hover:text-slate-500 hover:scale-110 rounded cursor-pointer mt-1" icon="system-uicons:cross"></iconify-icon></div>
			</div>
		</div>
  )
}
