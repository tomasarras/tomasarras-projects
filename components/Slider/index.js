import React, { useContext, useEffect, useState } from 'react';
import styles from "./Slider.module.css";
import Parallax from '../Parallax';
import { Context } from '../../Context';

export default function Slider({ slidesCount, getCurrentSlideIndex, onNext, onPrev, scrollToSlide }) {
  const [slides, setSlides] = useState([]);
  const currentIndex = getCurrentSlideIndex();
  const { setCurrentPage } = useContext(Context);
  
  useEffect(() => {
    let slides = [];
    for (let i = 0; i < slidesCount; i++)
      slides.push({ name: "0"+i, active: false });
    slides[0].active = true;
    setSlides(slides);
  }, [slidesCount]);

  useEffect(() => setCurrentPage(currentIndex), [currentIndex]);

  const changePage = index => {
    if (slides.length == 0)
      return;
    scrollToSlide(index);
    setSlides(slides => slides.map((slide, i) => ({ ...slide, active: i == index })));
  }

  return (<>
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          {slides.map((slide, i) => <li onClick={() => changePage(i)} key={i}>{slide.name}</li>)}
        </ul>
        <div style={{ transform: `translateY(${50 * currentIndex}px)` }} className={styles.line}></div>
      </nav>
    </div>
    <Parallax/>
  </>)
}