import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Slider from '../components/Slider';
import DesktopAnimation from '../components/DesktopAnimation';
import Container from '../components/Container';
import Header from '../components/Header';
import Experience from '../components/Pages/Experience';
import About from '../components/Pages/About';
import Hero from '../components/Pages/Hero';
import Skills from '../components/Pages/Skills';
import FullPage from '../components/Scroll/FullPage';
import { animationScrollDuration } from '../constants';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function Home({ }) {
  const size = useWindowDimensions();

  return (
    <div className={styles.container}>
      <Head>
        <title>Tomas Arras</title>
        <meta name="Tomas Arras" content="Tomas Arras" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="manifest" href="manifest.json"/>
        <link rel="apple-touch-icon" href="logo.ico"/>
        <link rel="icon" href="/logo.ico" />
      </Head>
      
      <Header/>
      <FullPage duration={animationScrollDuration} controls={Slider}>
        <Hero/>
        <Container page={1}>
          <About/>
        </Container>
        <Container page={2}>
          <Skills/>
        </Container>
        <Container page={3}>
          <Experience/>
        </Container>
      </FullPage>
    </div>
  )
}

