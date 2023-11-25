import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { FullPage, Slide } from 'react-full-page';
import Slider from '../components/Slider';
import DesktopAnimation from '../components/DesktopAnimation';
import { useWindowSize } from '@uidotdev/usehooks';

export default function Home({ }) {
  const size = useWindowSize();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Tomas Arras</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" integrity="sha256-2TnSHycBDAm2wpZmgdi0z81kykGPJAkiUY+Wf97RbvY=" crossorigin="anonymous"/>
        <meta name="Tomas Arras" content="Tomas Arras" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="manifest" href="manifest.json"/>
        <link rel="apple-touch-icon" href="logo.ico"/>
        <link rel="icon" href="/logo.ico" />
      </Head>

      <FullPage duration={100} controls={Slider}>
        <Slide style={{background: "#090909"}}>

          <h1 className={styles.slide1Title}>Hello friend.</h1>
          {/* <div style={{filter: "blur(6px)"}}>

          <Image
            src="/icons/code.svg"
            alt="Logo"
            width={600}
            height={800}
            />
            </div> */}
        </Slide>
        <Slide style={{background: "#090909"}}>
          <h1>Another slide content Another slide content Another slide content</h1>
          <div style={{margin: "145px 0 0 600px"}}>

            <DesktopAnimation width={400} height={400}/>
          </div>
        </Slide>
      </FullPage>
    </div>
  )
}

