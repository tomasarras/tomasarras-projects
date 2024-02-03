import styles from "./RadialDecorator.module.css"

export default function RadialDecorator({ top, left = false, size }) {

  return (
    <div style={{top,left: left ? "-15%" : "78%", width: "min(33vw, 640px)", height: size }} className={`${styles.radial} before:blur-2xl`}></div>
  );
}
