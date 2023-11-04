import React, { useEffect, useState } from 'react';
import s from "./BTTFCircuits.module.css";
import Switch from '../Switch';

export default function BTTFCircuits({ remainingMode, tempDestination, destination, present, lastTime }) {
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
    <div className={s[`overall-container`]}>
      <div className={`${s[`individual-time-circuit-wrapper-area`]} ${s[`individual-time-circuit-wrapper-area`]} ${s[`destination`]}`}>
        <div className={`${s["individual-time-circuit-content"]}`}>

          <div className={`${s["row-of-labels"]}`}>
            <div className={`${s["sticker-label"]} ${s[`month`]}`}>MONTH</div>
            <div className={`${s["sticker-label"]} ${s[`day`]}`}>DAY</div>
            <div className={`${s["sticker-label"]} ${s[`year`]}`}>YEAR</div>
            <div className={`${s["sticker-label"]} ${s[`hour`]}`}>HOUR</div>
            <div className={`${s["sticker-label"]} ${s[`min`]}`}>MIN</div>
          </div>

          <div className={`${s["row-of-numbers-display-area"]}`}>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-month"]}`}><div className={`${s["faded-eights"]}`}>888</div>{panel.destination.month}</div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-day"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.destination.day}</div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-year"]}`}><div className={`${s["faded-eights"]}`}>8888</div>{panel.destination.year}</div><div className={`${s["console-display"]} ${s["console-am-pm"]}`}>&nbsp;<div className={`${s["am-label"]}`}>AM</div>
              <div className={`${s["indicator-light"]} ${s["am"]} ${remainingMode ? s["light-red"] : panel.destination.isAm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
              <div className={`${s["pm-label"]}`}>PM</div>
              <div className={`${s["indicator-light"]} ${s["pm"]} ${remainingMode ? s["light-red"] : panel.destination.isPm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
            </div><div className={`${s["console-display"]} ${s["lcd"]} ${s["console-hour"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.destination.hour}</div>

            <div className={`${s["console-display"]} ${s["console-colon-lights"]}`}>
              &nbsp;
              <div className={`${s["indicator-light"]} ${s["top"]}`}>&nbsp;</div>
              <div className={`${s["indicator-light"]} ${s["bottom"]}`}>&nbsp;</div>
            </div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-min"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.destination.min}</div>
          </div>

          <div className={`${s["footer-label"]}`}>DESTINATION&nbsp;&nbsp;TIME</div>

        </div>
      </div>

      <div className={`${s["individual-time-circuit-wrapper-area"]} ${s["present"]}`}>
        <div className={`${s["individual-time-circuit-content"]}`}>

          <div className={`${s["row-of-labels"]}`}>
            <div className={`${s["sticker-label"]} ${s["month"]}`}>MONTH</div>
            <div className={`${s["sticker-label"]} ${s["day"]}`}>DAY</div>
            <div className={`${s["sticker-label"]} ${s["year"]}`}>YEAR</div>
            <div className={`${s["sticker-label"]} ${s["hour"]}`}>HOUR</div>
            <div className={`${s["sticker-label"]} ${s["min"]}`}>MIN</div>
          </div>

          <div className={`row-of-numbers-display-area`}>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-month"]}`}><div className={`${s["faded-eights"]}`}>888</div><span>{panel.present.month}</span></div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-day"]}`}><div className={`${s["faded-eights"]}`}>88</div><span>{panel.present.day}</span></div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-year"]}`}><div className={`${s["faded-eights"]}`}>8888</div><span>{panel.present.year}</span></div><div className={`${s["console-display"]} ${s["console-am-pm"]}`}>&nbsp;<div className={`${s["am-label"]}`}>AM</div>
              <div className={`${s["indicator-light"]} ${s["am"]} ${panel.present.isAm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
              <div className={`${s["pm-label"]}`}>PM</div>
              <div className={`${s["indicator-light"]} ${s["pm"]} ${panel.present.isPm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
            </div><div className={`${s["console-display"]} ${s["lcd"]} ${s["console-hour"]}`}><div className={`${s["faded-eights"]}`}>88</div><span>{panel.present.hour}</span></div>

            <div className={`${s["console-display"]} ${s["console-colon-lights"]}`}>
              &nbsp;
              <div className={`${s["indicator-light"]} ${s["top"]}`}>&nbsp;</div>
              <div className={`${s["indicator-light"]} ${s["bottom"]}`}>&nbsp;</div>
            </div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-min"]}`}><div className={`${s["faded-eights"]}`}>88</div><span>{panel.present.min}</span></div>
          </div>

          <div className={`${s["footer-label"]}`}>PRESENT&nbsp;&nbsp;TIME</div>

        </div>
      </div>

      <div className={`${s["individual-time-circuit-wrapper-area"]} ${s["last-time-departed"]}`}>
        <div className={`${s["individual-time-circuit-content"]}`}>

          <div className={`${s["row-of-labels"]}`}>
            <div className={`${s["sticker-label"]} ${s["month"]}`}>MONTH</div>
            <div className={`${s["sticker-label"]} ${s["day"]}`}>DAY</div>
            <div className={`${s["sticker-label"]} ${s["year"]}`}>YEAR</div>
            <div className={`${s["sticker-label"]} ${s["hour"]}`}>HOUR</div>
            <div className={`${s["sticker-label"]} ${s["min"]}`}>MIN</div>
          </div>

          <div className={`${s["row-of-numbers-display-area"]}`}>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-month"]}`}><div className={`${s["faded-eights"]}`}>888</div>{panel.lastTime.month}</div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-day"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.lastTime.day}</div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-year"]}`}><div className={`${s["faded-eights"]}`}>8888</div>{panel.lastTime.year}</div><div className={`${s["console-display"]} ${s["console-am-pm"]}`}>&nbsp;<div className={`${s["am-label"]}`}>AM</div>
              <div className={`${s["indicator-light"]} ${s["am"]} ${panel.lastTime.isAm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
              <div className={`${s["pm-label"]}`}>PM</div>
              <div className={`${s["indicator-light"]} ${s["pm"]} ${panel.lastTime.isPm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
            </div><div className={`${s["console-display"]} ${s["lcd"]} ${s["console-hour"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.lastTime.hour}</div>

            <div className={`${s["console-display"]} ${s["console-colon-lights"]}`}>
              &nbsp;
              <div className={`${s["indicator-light"]} ${s["top"]}`}>&nbsp;</div>
              <div className={`${s["indicator-light"]} ${s["bottom"]}`}>&nbsp;</div>
            </div>
            <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-min"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.lastTime.min}</div>
          </div>

          <div className={`${s["footer-label"]}`}>LAST&nbsp;&nbsp;TIME&nbsp;&nbsp;DEPARTED</div>
        </div>
      </div>

      {/* <div className={`${s[`individual-time-circuit-wrapper-area`]} ${s[`individual-time-circuit-wrapper-area`]} ${s[`destination`]}`}>
        <div className={s["settings-wrapper-area"]}>
          <div className={`${s["sticker-label"]} ${s["month"]}`}>REMAINING MODE</div>
            <div className={s["switch-remaining"]}>
              <Switch isOn={remainingMode} onSwitch={switchRemainingMode}/>
            </div>
        </div>
      </div> */}

    </div>
  </>)
}