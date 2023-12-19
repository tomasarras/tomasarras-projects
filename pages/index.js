import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { FullPage, Slide } from 'react-full-page';
import Slider from '../components/Slider';
import DesktopAnimation from '../components/DesktopAnimation';
import { useWindowSize } from '@uidotdev/usehooks';
import Container from '../components/Container';
import Header from '../components/Header';
import Experience from '../components/Pages/Experience';
import About from '../components/Pages/About';
import Hero from '../components/Pages/Hero';
import Skills from '../components/Pages/Skills';

export default function Home({ }) {
  const size = useWindowSize();

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
      <FullPage duration={100} controls={Slider}>
        <Slide>
          <Hero/>
        </Slide>
        <Slide>
          <Container page={1}>
            <About/>
          </Container>
        </Slide>
        <Slide>
          <Container page={2}>
            <Skills/>
          </Container>
        </Slide>
        <Slide>
          <Container page={3}>
            <Experience/>
          </Container>
        </Slide>
      </FullPage>
    </div>
  )
}

