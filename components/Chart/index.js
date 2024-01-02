import React from 'react';
import styles from "./Chart.module.css";
import Image from 'next/image';
import DevOpsIcon from '../Icons/DevOps/DevOpsIcon';

const ChartItem = ({ src, title, children, size, activeChart, style }) => (<>
  <div className={`${(activeChart == null || activeChart == title) ? styles.active : ""}`}>
    <span className={`text-lg font-bold ${title == "devops" ? styles.devopsLabel : title == 'backend' ? styles.backendLabel : styles.frontendLabel}`}>{children}</span>
    <Image
      src={src}
      alt="semicircle"
      style={style}
      width={size}
      height={size}
    />
  </div>
</>);

export default function Chart({ size, activeChart }) {
  const greenFilter = {filter: "invert(62%) sepia(65%) saturate(2602%) hue-rotate(101deg) brightness(97%) contrast(98%);"}
  const lightBlueFilter = {filter: "invert(58%) sepia(91%) saturate(1120%) hue-rotate(148deg) brightness(94%) contrast(108%);"}
  const orangeFilter = {filter: "invert(46%) sepia(63%) saturate(903%) hue-rotate(333deg) brightness(107%) contrast(98%);"}
  
  return (<>
  <div className={styles.container}>
    <ChartItem src="/chart_pie_1.svg" style={greenFilter} title="devops" size={size} activeChart={activeChart}><DevOpsIcon theme={'dark'} style={{width:"166px", height: "56px"}}/></ChartItem>
    <ChartItem src="/chart_pie_2.svg" style={orangeFilter} title="backend" size={size} activeChart={activeChart}><img src="/icons/server.svg" style={{filter: "invert(1)", width:"70px", height: "70px"}}/>Back-End</ChartItem>
    <ChartItem src="/chart_pie_3.svg" style={lightBlueFilter} title="frontend" size={size} activeChart={activeChart}><img src="/icons/client.svg" style={{filter: "invert(1)", width:"105px", height: "70px"}}/>Front-End</ChartItem>
  </div>
  </>)
}