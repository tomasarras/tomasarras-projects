import styles from './GradientBlob.module.css';

export default function GradientBlob() {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.blob} ${styles.blob1}`}/>
      <div className={`${styles.blob} ${styles.blob2}`}/>
    </div>
  );
}
