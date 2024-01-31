import React, { useContext } from 'react';
import s from './DropdownHeaderMenu.module.css'
import AnimationHandler from '../Utils/AnimationHandler';
import { Context } from '@/app/Context/HeaderContext';

export default function DropdownHeaderMenu({ children }) {
	const { isSidebarOpen } = useContext(Context)

	const animation = {
		height: isSidebarOpen ? 'fit-content' : 0
	}

	return (<>
		<AnimationHandler isAnimationEnabled initial={false} animate={animation} className={`${s.sidebar} ${isSidebarOpen ? s.open : ''}`}>
				{children}
		</AnimationHandler>
	</>);
}