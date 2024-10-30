import React, { useEffect, useState } from 'react';
import s from "./BTTFCircuits.module.css";
import BTTFCircuits from '.';

export default function BTTFCircuitsManager({ width, height, remainingMode, tempDestination, destination, present, lastTime }) {
  const empty = {
    month: "---",
    day: "--",
    year: "----",
    hour: "--",
    min: "--",
    isAm: true,
    isPm: false,
  };
  const [panel, setPanel] = useState({ destination: empty, present: empty, lastTime: empty });
  

  const calcRemainingTime = date => {
    const diff = date - new Date();
    const remaining = {
      month: "---",
      day: "00",
      year: "0000",
      hour: "00",
      min: "00",
      isAm: false,
      isPm: false,
    }
    if (diff < 0) {
      return remaining;
    }
    const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsInMin = 60 * 1000;

    remaining.year = Math.floor(diff / millisecondsInYear)
      .toString()
      .padStart(4, '0');
    remaining.day = Math.min(Math.floor(diff / millisecondsInDay) % 365, 99)
      .toString()
      .padStart(2, '0');
    remaining.hour = Math.floor((diff / (60 * 60 * 1000)) % 24)
      .toString()
      .padStart(2, '0');
    remaining.min = Math.floor((diff / millisecondsInMin) % 60)
      .toString()
      .padStart(2, '0');
    return remaining;
  };

  const updatePanel = () => {
    let dest;
    if (tempDestination == null) 
      dest = remainingMode ? calcRemainingTime(destination) : dateDetails(destination);
    else
      dest = tempDestination;
    setPanel({
      destination: dest,
      present: dateDetails(present == undefined ? new Date() : present),
      lastTime: dateDetails(lastTime),
    });
  }

  useEffect(() => {
    updatePanel();
    if (global.bttfCircuitsInterval != undefined) {
      clearInterval(global.bttfCircuitsInterval);
    }
    const interval = setInterval(updatePanel, 1000);
    global.bttfCircuitsInterval = interval;
    return () => {
      clearInterval(interval);
    };
  }, [remainingMode, tempDestination]);

  const dateDetails = date => {
    if (date === undefined)
      return empty;
    const month = date.toLocaleString('default', { month: 'short' })
      .slice(0, 3)
      .toUpperCase();
    const day = date.getDate()
      .toString()
      .padStart(2, '0');
    let hour = date.getHours();
    let isAm = hour < 13;
    let isPm = hour >= 13;
    if (isPm)
      hour = hour -12;
    hour = hour
      .toString()
      .padStart(2, '0');
    const min = date.getMinutes()
      .toString()
      .padStart(2, '0');
    return { ...empty, month, day, year: date.getFullYear(), hour, min, isAm, isPm }
  }
  

  return (<>
    <BTTFCircuits width={width} height={height} panel={panel} remainingMode={remainingMode} />
  </>)
}