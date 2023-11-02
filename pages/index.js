import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BTTFCircuits from '../components/BTTFCircuits';
import Sidebar from '../components/Sidebar';
import SidebarButton from '../components/Buttons/SidebarButton';
import BTTFNumpad from '../components/BTTFNumpad';
export default function Home({ initialDestination, lastTime }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [destination, setDestination] = useState(new Date(initialDestination));
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [typingDestination, setTypingDestination] = useState(null);
  const [tempDestination, setTempDestination] = useState(null);
  const onConfirm = (newDestination) => setDestination(newDestination);
  
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
            <BTTFNumpad onConfirm={onConfirm} tempDestination={tempDestination} setTempDestination={setTempDestination} width={250} typingDestination={typingDestination} setTypingDestination={setTypingDestination}/>
          </div>
        </Sidebar>
        <div className={`content`}>
          <div className='flex h-100vh w-100vw'>
            <div className='flex h-100 align-items-center'>
              <SidebarButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}/>
            </div>
            <div className='flex align-items-center justify-content-center w-100'>
              <BTTFCircuits tempDestination={tempDestination} lastTime={new Date(lastTime)} destination={destination}/>
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
