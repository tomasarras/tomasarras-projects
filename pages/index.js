import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { FullPage, Slide } from 'react-full-page';
import Slider from '../components/Slider';
import DesktopAnimation from '../components/DesktopAnimation';
import { useWindowSize } from '@uidotdev/usehooks';
import Container from '../components/Container';

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
        <Slide >

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
        <Slide>
          <Container>
            <div className='w-100 h-100 align-center d-flex justify-between items-center'>
              <div className='w-50'>
                <div className='d-flex items-center w-100 flex-column mb-6'>
                  <h1 className='mb-4 text-5xl font-bold'>About me</h1>
                  <div className='title-underline'></div>
                </div>
                <h2 className='text-3xl mb-6'>Full Stack Web Developer</h2>
                <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
              </div>
              <DesktopAnimation width={400} height={400}/>
            </div>
          </Container>
        </Slide>
      </FullPage>
    </div>
  )
}

