import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BTTFCircuits from '../components/BTTFCircuits';
import Sidebar from '../components/Sidebar';
import SidebarButton from '../components/Buttons/SidebarButton';
import BTTFNumpad from '../components/BTTFNumpad';
import SidebarContainer from '../components/Sidebar/Container';
import Switch from '../components/Switch';
import CryptoJS from 'crypto-js';
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
    attestationAttempt(data); 
  }

  const attestationAttempt = async (data) => {
    const { stats } = data;
    const hash = input => CryptoJS.SHA256(input.toString()).toString(CryptoJS.enc.Hex);
    const h1 = hash(stats.red);
    const h2 = hash(stats.green);
    const h3 = hash(stats.white);
    const h4 = hash(stats.yellow);
    const h5 = hash(typingDestination);
    const h6 = hash(switchCounter);

    const attestationData = { data:h1+h2+h3+h4+h5+h6 };
    console.log(attestationData);
    let url = window.location.href;
    if (url.endsWith('/'))
      url = url.slice(0, -1);
    fetch(url + "/api/attestation", {
      method: "POST",
      body: JSON.stringify(attestationData)
    });
  
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
