import React from 'react';
import styles from "./Chart.module.css";
import Image from 'next/image';

const ChartItem = ({ src, title, children, size, activeChart }) => (<>
  <div className={`${(activeChart == null || activeChart == title) ? styles.active : ""}`}>
    <span className={`text-2xl font-bold ${title == "design" ? styles.designLabel : title == 'backend' ? styles.backendLabel : styles.frontendLabel}`}>{children}</span>
    <Image
      src={src}
      alt="semicircle"
      width={size}
      height={size}
    />
  </div>
</>);

export default function Chart({ size, activeChart }) {

  
  return (<>
  <div className={styles.container}>
    <ChartItem src="/chart_pie_1.svg" title="design" size={size} activeChart={activeChart}>Design</ChartItem>
    <ChartItem src="/chart_pie_2.svg" title="backend" size={size} activeChart={activeChart}>Back-End</ChartItem>
    <ChartItem src="/chart_pie_3.svg" title="frontend" size={size} activeChart={activeChart}>Front-End</ChartItem>
  </div>
  </>)
}