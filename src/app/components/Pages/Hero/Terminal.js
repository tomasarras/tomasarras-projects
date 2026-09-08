"use client"
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const TEXT = "Hello, I'm Tomas.";
const TYPE_SPEED = 70;

export default function Terminal() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(TEXT.slice(0, i));
      if (i >= TEXT.length) clearInterval(interval);
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <span className={`${styles.dot} ${styles.dotRed}`}/>
        <span className={`${styles.dot} ${styles.dotYellow}`}/>
        <span className={`${styles.dot} ${styles.dotGreen}`}/>
      </div>
      <div className={`${styles.terminalBody} as-text`}>
        <span className={styles.prompt}>&gt;</span>{typed}<span className={styles.cursor}>_</span>
      </div>
    </div>
  );
}
