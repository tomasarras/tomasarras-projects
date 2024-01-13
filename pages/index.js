import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Slider from '../components/Slider/Slider';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import Experience from '../components/Pages/Experience/Experience';
import About from '../components/Pages/About/About';
import Hero from '../components/Pages/Hero/Hero';
import Skills from '../components/Pages/Skills/Skills';
import FullPage from '../components/Scroll/FullPage';
import { animationScrollDuration } from '../constants/Constants';
import Contact from '../components/Pages/Contact/Contact';

export default function Home({ }) {

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
        {/* <Container page={3}>
          <Experience/>
        </Container>
        <Container page={4}>
          <Contact/>
        </Container> */}
      </FullPage>
    </div>
  )
}

