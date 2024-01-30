import styles from "./RadialDecorator.module.css"

export default function RadialDecorator({ top, left, size, halfSize }) {

  return (
    /**TODO Check next 14 */
    <div style={{top,left, width: size, height: size, background: `radial-gradient(circle ${halfSize}, var(--gradial-circle-radiants), var(--background-color) 100%)`}} className={`${styles["radial"]}`}></div>
  );
}
