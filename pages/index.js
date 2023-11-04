import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BTTFCircuits from '../components/BTTFCircuits';
import Sidebar from '../components/Sidebar';
import SidebarButton from '../components/Buttons/SidebarButton';
import BTTFNumpad from '../components/BTTFNumpad';
import SidebarContainer from '../components/Sidebar/Container';
import Switch from '../components/Switch';
import s from './index.module.css';

export default function Home({ initialDestination, lastTime }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [destination, setDestination] = useState(new Date(initialDestination));
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [remainingMode, setRemainingMode] = useState(true);
  const [switchCounter, setSwitchCounter] = useState(0);
  const [typingDestination, setTypingDestination] = useState(null);
  const [tempDestination, setTempDestination] = useState(null);
  const onConfirm = (data) => {
    setDestination(data.destination);
    const { stats } = data;
    const num = stats.red.toString();
    //console.log(num);
  }

  const switchRemainingMode = () => {
    setRemainingMode(!remainingMode);
    setSwitchCounter(switchCounter +1);
  }

  useEffect(() => {
    if (!isSidebarOpen)
      return;
  
    const handleKeyUp = e => {
      const key = e.key;
      if (!(key == 'Escape'))
        return;
      setIsSidebarOpen(false);
    };
  
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isSidebarOpen, typingDestination]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Tomas Arras</title>
        <meta name="Tomas Arras" content="Tomas Arras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
          <div className='flex h-100 align-items-center'>
            <SidebarContainer>
              <BTTFNumpad isSidebarOpen={isSidebarOpen} onConfirm={onConfirm} tempDestination={tempDestination} setTempDestination={setTempDestination} width={218} typingDestination={typingDestination} setTypingDestination={setTypingDestination}/>
              <div className={`${s["sticker-label"]}`}>REMAINING MODE</div>
              <div className={`${s["switch-container"]}`}>
                <Switch isOn={remainingMode} onSwitch={switchRemainingMode}/>
              </div>
            </SidebarContainer>
          </div>
        </Sidebar>
        <div className={`content`}>
          <div className='flex min-h-100vh w-100vw'>
            <div className='flex h-100vh align-items-center'>
              <SidebarButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}/>
            </div>
            <div className='flex align-items-center justify-content-center w-100 py-4'>
              <BTTFCircuits remainingMode={remainingMode} tempDestination={tempDestination} lastTime={new Date(lastTime)} destination={destination}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  const { client } = require('../db');
  const db = client();
  const [bttf] = await db.any('SELECT * from bttf');
  return { props: { initialDestination: bttf.destination.toISOString(), lastTime: bttf["last_time"].toISOString() } }
})
