import React from 'react';
import BTTFNumpad from '../BTTFNumpad';
import Switch from '../Switch';
import s from "./SidebarContent.module.css";
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function SidebarContent({ isSidebarOpen, onConfirm, tempDestination, setTempDestination, typingDestination, setTypingDestination, switchRemainingMode, remainingMode }) {
  const size = useWindowDimensions();
  const isMobile = () => size.width <= 576;
  
  return (<> 
  <div className='flex justify-content-center'>
    <BTTFNumpad 
      isSidebarOpen={isSidebarOpen}
      onConfirm={onConfirm}
      tempDestination={tempDestination}
      setTempDestination={setTempDestination}
      width={isMobile() ? size.width -140: 218}
      typingDestination={typingDestination}
      setTypingDestination={setTypingDestination}
    />
  </div>
  <div className={`${s["remaining-mode-container"]} w-100 flex align-items-center flex-column`}>
    <div>
      <div className={`${s["sticker-label"]}`}>REMAINING MODE</div>
    </div>
    <div className={`${s["switch-container"]}`}>
      <Switch isOn={remainingMode} onSwitch={switchRemainingMode}/>
    </div>
  </div>
  
  </>);
}