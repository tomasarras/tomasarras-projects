"use client"
import Header from "../../components/Header/Header";
import { Provider } from "../../Context";
import FullPage from "@/app/components/Scroll/FullPage";
import Hero from "@/app/components/Pages/Hero/Hero";
import Container from "@/app/components/Container/Container";
import About from "@/app/components/Pages/About/About";
import Skills from "@/app/components/Pages/Skills/Skills";
import Experience from "@/app/components/Pages/Experience/Experience";
import Portfolio from "@/app/components/Pages/Portfolio/Portfolio";
import Contact from "@/app/components/Pages/Contact/Contact";
import { animationScrollDuration } from "@/app/Constants";
import RadialDecorators from "@/app/components/Decorators/RadialDecorators";

export default function Home({params: {section}}) {
  
  return (
    <Provider section={section}>
      <main>
        <Header/>
        <RadialDecorators/>
        <FullPage duration={animationScrollDuration}>
          <Hero/>
          <Container page={1} center>
            <About/>
          </Container>
          <Container page={2}>
            <Skills/>
          </Container>
          <Container page={3} center>
            <Experience/>
          </Container>
          <Container className={`relative`} page={4} noPadding noHeaderPadding>
            <Portfolio/>
          </Container>
          <Container page={5} noCenter>
            <Contact/>
          </Container>
        </FullPage>
      </main>
    </Provider>
  );
}
