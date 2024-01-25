import React, { useEffect, useState } from 'react';
import styles from "./RadialDecorator.module.css"

export default function RadialDecorator({ top, left, size }) {

  return (
    <div style={{top,left, width: size, height: size, background: `radial-gradient(circle ${size/2}px, var(--gradial-circle-radiants), var(--background-color) 100%)`}} className={`${styles["radial"]}`}></div>
  );
}
