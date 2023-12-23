import React, { useContext, useEffect, useState } from 'react';
import styles from "./Slider.module.css";
import Parallax from '../Parallax';
import { Context } from '../../Context';

export default function Slider({ slidesCount }) {
  const [slides, setSlides] = useState([]);
  const { setCurrentPage, currentPage } = useContext(Context);
  
  useEffect(() => {
    let slides = [];
    for (let i = 0; i < slidesCount; i++)
      slides.push({ name: "0"+i, active: false });
    slides[0].active = true;
    setSlides(slides);
  }, [slidesCount]);

  const changePage = index => {
    if (slides.length == 0)
      return;
    setCurrentPage(index)
    setSlides(slides => slides.map((slide, i) => ({ ...slide, active: i == index })));
  }

  return (<>
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          {slides.map((slide, i) => <li onClick={() => changePage(i)} key={i}>{slide.name}</li>)}
        </ul>
        <div style={{ transform: `translateY(${50 * currentPage}px)` }} className={styles.line}></div>
      </nav>
    </div>
    <Parallax/>
  </>)
}