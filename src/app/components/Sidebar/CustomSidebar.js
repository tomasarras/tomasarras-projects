import React, { useRef } from 'react';
import s from './CustomSidebar.module.css'
import { motion } from 'framer-motion';
import { CloseIcon } from '../Icons/CloseIcon';

export default function CustomSidebar({ isOpen, children, onClose }) {
    const container = useRef()
    const sidebar = useRef()

    const handleOnClose = (event) => {
        if (container.current == undefined || sidebar.current == undefined) return
        if (container.current.contains(event.target) &&
            !sidebar.current.contains(event.target)) {
                onClose()
        }
    }
    
    const animation = {
        x: isOpen ? 0 : '100%'
    }
  
    return (<>
        <motion.div
            ref={container}
            initial={false}
            onClick={handleOnClose}
            animate={animation}
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className={`sm:hidden w-full h-full fixed top-0 flex flex-row-reverse z-20`}
            >
            <div ref={sidebar} className={`${s.sidebar} ${isOpen ? s.open : ''} p-4`}>
                <div onClick={onClose} className='h-8 w-8'><CloseIcon/></div>
                {children}
            </div>
        </motion.div>
    </>);
}