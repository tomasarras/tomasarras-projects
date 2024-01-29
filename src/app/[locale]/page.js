"use client"
import Image from "next/image";
import {useTranslations} from 'next-intl';
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useRef } from "react";
import Header from "../components/Header/Header";
import { Provider } from "../Context";
import FullPage from "../components/Scroll/FullPage";
import Hero from "../components/Pages/Hero/Hero";
import Container from "../components/Container/Container";
import About from "../components/Pages/About/About";
import Skills from "../components/Pages/Skills/Skills";
import Experience from "../components/Pages/Experience/Experience";
import Portfolio from "../components/Pages/Portfolio/Portfolio";
import Contact from "../components/Pages/Contact/Contact";
import { animationScrollDuration } from "../constants/Constants";
import Slider from "../components/Slider/Slider";

export default function Home() {
  //const t = useTranslations();
  const sections = useRef([])
  const bodyContainer = useRef()
  const size = useWindowDimensions()
  const maxRadialDecorator = Math.min(size.width, 1920)

  return (
    <Provider>
      <main ref={bodyContainer}>
        <Header sections={sections}/>
        <FullPage duration={animationScrollDuration} controls={Slider}>
          <Hero/>
          <Container page={1} center>
            <About innerRef={(el) => sections.current[1] = el}/>
          </Container>
          <Container page={2}>
            <Skills innerRef={(el) => sections.current[2] = el}/>
          </Container>
          <Container page={3} center>
            <Experience innerRef={(el) => sections.current[3] = el}/>
          </Container>
          <Container className={`relative`} page={4} noPadding noHeaderPadding>
            <Portfolio innerRef={(el) => sections.current[4] = el}/>
          </Container>
          <Container page={5} noCenter>
            <Contact innerRef={(el) => sections.current[5] = el}/>
          </Container>
        </FullPage>
      </main>
    </Provider>
  );
}
