import React, { useState } from 'react';
import styles from "./DotsSlider.module.css"

export default function DotsSlider({ amount, active, setActive }) {
	const [direction, setDirection] = useState("left")
	const emMultiplicator = 2
  const dots = [];

	const handleChangeIndex = (newIndex) => {
		setDirection(newIndex > active ? "right" : "left")
		setActive(newIndex)
	}
	
  for (let i = 0; i < amount; i++) {
    dots.push(
      <span
        key={i}
        className={`${styles["slider__dot"]} cursor-pointer`}
        data-pos={i}
        onClick={() => handleChangeIndex(i)}
      ></span>
    );
  }

	{/**TODO: https://codepen.io/electerious/pen/JXNEPr */}
  return (
    <div className={`${styles["slider__dots"]}`}>
      <span style={{
				left: active* emMultiplicator + "em",
				right: ((amount-1)*emMultiplicator) - (active* emMultiplicator) + "em" }} className={`${styles["slider__indicator"]} ${styles["slider__indicator--" + direction]} cursor-pointer`}></span>
      {dots}
    </div>
  );
}
