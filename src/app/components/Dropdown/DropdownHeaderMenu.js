import React from 'react';
import s from './DropdownHeaderMenu.module.css'
import { motion } from 'framer-motion';

export default function DropdownHeaderMenu({ isOpen, children }) {

    const animation = {
        height: isOpen ? 'fit-content' : 0
    }
  
    return (<>
        <motion.div initial={false} animate={animation} className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
            {children}
        </motion.div>
    </>);
}