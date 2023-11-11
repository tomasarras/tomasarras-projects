import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import SidebarButton from '../components/Buttons/SidebarButton';
import SidebarContainer from '../components/Sidebar/Container';
import CryptoJS from 'crypto-js';
import s from './index.module.css';
import BTTFCircuitsManager from '../components/BTTFCircuits/BTTFCircuitsManager';
import { useWindowSize } from '@uidotdev/usehooks';
import SidebarResponsive from '../components/Sidebar/SidebarResponsive';
import SidebarContent from '../components/Sidebar/SidebarContent';

export default function Home({ initialDestination, lastTime }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const size = useWindowSize();
  const [panelWidth, setPanelWidth] = useState(960);
  const [panelHeight, setPanelHeight] = useState(195);
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

  const isMobile = () => size.width <= 576;

  useEffect(() => {
    let wd = Math.min(size.width, 960);
    wd = isMobile() ? wd-40 : wd;
    setPanelWidth(wd);
    setPanelHeight(wd * 0.2031);
  }, [size]);

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
    console.log(switchCounter, h6);
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="manifest" href="manifest.json"/>
        <link rel="apple-touch-icon" href="favicon.ico"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={isSidebarOpen}>
          <div className='flex h-100 align-items-center'>
            <SidebarContainer>
              <SidebarContent
                isSidebarOpen={isSidebarOpen}
                onConfirm={onConfirm}
                tempDestination={tempDestination}
                setTempDestination={setTempDestination}
                typingDestination={typingDestination}
                setTypingDestination={setTypingDestination}
                switchRemainingMode={switchRemainingMode}
                remainingMode={remainingMode} 
              />
            </SidebarContainer>
          </div>
        </Sidebar>
        <div className={`content`}>
          <div style={{height: size.height+"px"}} className={`${s["main-container"]} flex w-100vw`}>
            <SidebarResponsive isOpen={isSidebarOpen}>
              <div className='py-4 px-8'>
                <SidebarContent
                  isSidebarOpen={isSidebarOpen}
                  onConfirm={onConfirm}
                  tempDestination={tempDestination}
                  setTempDestination={setTempDestination}
                  typingDestination={typingDestination}
                  setTypingDestination={setTypingDestination}
                  switchRemainingMode={switchRemainingMode}
                  remainingMode={remainingMode} 
                />
              </div>
            </SidebarResponsive>
            <div className={`h-100vh flex align-items-center ${s["sidebar-button-container"]}`}>
              <SidebarButton className={s["sidebar-button"]} isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}/>
            </div>
            <div className={`${s["circuits-container"]} flex align-items-center justify-content-center w-100 py-4`}>
              <BTTFCircuitsManager
                height={panelHeight}
                width={panelWidth}
                remainingMode={remainingMode}
                tempDestination={tempDestination}
                lastTime={new Date(lastTime)}
                destination={destination}
              />
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
