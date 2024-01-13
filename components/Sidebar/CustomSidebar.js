import React from 'react';
import s from './CustomSidebar.module.css'
import { motion } from 'framer-motion';

export default function CustomSidebar({ isOpen, children }) {

    const variants = {
        "closed": {
            display: 'none',
            opacity: 0
        },
        'open': {
            display: "block",
            opacity: 1
        }
    }

    const animation = {
        x: isOpen ? 0 : '100%'
    }

  
    return (<motion.div variants={variants} animate={isOpen ? "open" : "closed"} className={`w-full h-full fixed top-0 flex flex-row-reverse z-20`}>
            <motion.div animate={animation} transition={{ type: "spring", bounce: 0, duration: 0.8 }} className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
                {children}
            </motion.div>
        </motion.div>);
}