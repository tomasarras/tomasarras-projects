import React, { useEffect, useState } from 'react';
import s from "./BTTFCircuits.module.css";

export default function BTTFCircuits({ destination, present, lastTime }) {
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
  const [remainingMode, setRemainingMode] = useState(false);
  const switchRemainingMode = () => setRemainingMode(!remainingMode);

  const calcRemainingTime = date => {
    const diff = date - new Date();
    const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsInMin = 60 * 1000;

    const year = Math.floor(diff / millisecondsInYear)
      .toString()
      .padStart(4, '0');
    const month = "---";
    const day = Math.min(Math.floor(diff / millisecondsInDay) % 365, 99)
      .toString()
      .padStart(2, '0');
    const hour = Math.floor((diff / (60 * 60 * 1000)) % 24)
      .toString()
      .padStart(2, '0');
    const min = Math.floor((diff / millisecondsInMin) % 60)
      .toString()
      .padStart(2, '0');
    return {
      month,
      day,
      year,
      hour,
      min,
      isAm: false,
      isPm: false,
    }
  };

  const updatePanel = () => {
    setPanel({
      destination: remainingMode ? calcRemainingTime(destination) : dateDetails(destination),
      present: dateDetails(present == undefined ? new Date() : present),
      lastTime: dateDetails(lastTime),
    });
  }

  useEffect(() => {
    updatePanel();
    const interval = setInterval(updatePanel, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingMode]);

  const dateDetails = date => {
    if (date === undefined)
      return empty;
    const month = date.toLocaleString('default', { month: 'short' })
      .slice(0, 3)
      .toUpperCase();
    const day = date.getDate()
      .toString()
      .padStart(2, '0');
    const hour = date.getHours()
      .toString()
      .padStart(2, '0');
    const min = date.getMinutes()
      .toString()
      .padStart(2, '0');
    return { ...empty, month, day, year: date.getFullYear(), hour, min }
  }
  

  return (<>
    <div className={s[`overall-container`]}>
      <div onClick={switchRemainingMode} className={`${s[`individual-time-circuit-wrapper-area`]} ${s[`individual-time-circuit-wrapper-area`]} ${s[`destination`]}`}>
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


    </div>
  </>)
}