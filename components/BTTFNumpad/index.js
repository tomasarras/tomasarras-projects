import React, { useEffect, useRef, useState } from 'react';
import s from "./BTTFNumpad.module.css";

export default function BTTFNumpad({ onConfirm, tempDestination, setTempDestination, width, typingDestination, setTypingDestination }) {
  const empty = {
    month: "---",
    day: "--",
    year: "----",
    hour: "--",
    min: "--",
    isAm: true,
    isPm: false,
    invalid: false,
  };
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DIC"];
  const containerStyles = { height: height + "px" };
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  if (width != undefined)
    containerStyles.minWidth = width;

  const loadSounds = () => {
    if (global.confirmAudio == undefined)                                                                     
      global.confirmAudio = new Audio("https://cdn.josetxu.com/audio/bttf-input-button.mp3");
    if (global.confirmAudio2 == undefined)
      global.confirmAudio2 = new Audio("https://raw.githubusercontent.com/tomasarras/tomasarras/main/public/sounds/circuits.mp3");
    if (global.bttfDial1 == undefined)
      global.bttfDial1 = new Audio("https://cdn.josetxu.com/audio/bttf-dial-1.mp3");
    if (global.bttfDial2 == undefined)
      global.bttfDial2 = new Audio("https://cdn.josetxu.com/audio/bttf-dial-2.mp3");
    if (global.bttfDial3 == undefined)
      global.bttfDial3 = new Audio("https://cdn.josetxu.com/audio/bttf-dial-3.mp3");
  }

  const handleOnConfirm = () => {
    if (typingDestination == null || typingDestination.length < 12 || tempDestination.invalid) {
      global.confirmAudio.play();
      setTempDestination(empty);
      setTypingDestination(null);
    } else {
      global.confirmAudio2.play();
      setTempDestination(null);
      setTypingDestination(null);
      let month = months.indexOf(tempDestination.month);
      let newDestination = new Date(parseInt(tempDestination.year), month, parseInt(tempDestination.day), parseInt(tempDestination.hour), parseInt(tempDestination.min));
      onConfirm(newDestination);
    }
  }

  useEffect(loadSounds, []);

  useEffect(() => {
    if (typingDestination == null)
      return;
    const destination = Object.assign(empty, {});
    let month = typingDestination.substring(0, 2);
    month = months[parseInt(month)-1];
    let day = typingDestination.substring(2, 4);
    if (day.length == 0)
      day = "--";
    else if (day.length == 1) {
      day = day + "-";
    } else {
      let numberDay = parseInt(day);
      if (numberDay < 1 || numberDay > 31) {
        day = "ER";
        destination.invalid = true;
      }
    }
    let year = typingDestination.substring(4, 8);
    if (year.length == 0) {
      year = "----";
    } else if (year.length == 1) {
      year = year + "---";
    } else if (year.length == 2) {
      year = year + "--";
    } else if (year.length == 3) {
      year = year + "-";
    } else if (year.length == 4) {
      year = year;
    }
    let hour = typingDestination.substring(8, 10);
    if (hour.length == 0) {
      hour = "--";
    } else if (hour.length == 1) {
      hour = hour + "-";
    } else if (hour.length == 2) {
      let hourNumber = parseInt(hour);
      if (hourNumber > 23) {
        hour = "ER";
        destination.invalid = true;
      } else {
        hour = hour;
      }
    }
    let min = typingDestination.substring(10, 12);
    if (min.length == 0) {
      min = "--";
    } else if (min.length == 1) {
      min = min + "-";
    } else if (min.length == 2) {
      let minNumber = parseInt(min);
      if (minNumber > 59) {
        min = "ER";
        destination.invalid = true;
      } else {
        min = min;
      }
    }
    if (month == undefined) {
      destination.month = "ERR";
      destination.invalid = true;
    } else {
      destination.month = month;
    }
    destination.day = day;
    destination.year = year;
    destination.min = min;
    destination.hour = hour;
    setTempDestination(destination);
  }, [typingDestination]);

  useEffect(() => {
    const w = width !== undefined ? width : containerRef.current.offsetWidth;
    setHeight(w * 1.2);
  }, [containerRef])
  
  const Number = ({ value }) => (
  <div className={`${s.number} ${s[numbers[value]]}`} onClick={() => onPressNumber(value)}>
    <div style={{ fontSize: height * 0.5166 + "%" }} className={`${s.side}`}></div>
  </div> );

  const playSound = number => {
    if (number == 0) {
      global.bttfDial2.play();
      return;
    }
    number = number >= 4 ? number -3 : number;
    number = number >= 4 ? number -3 : number;
    global["bttfDial"+number].play();
  }

  const onPressNumber = number => {
    playSound(number);
    if (typingDestination == null)
      setTypingDestination(number + "");
    else
      setTypingDestination(typingDestination + "" + number);
  }

  const Led = ({ color, onClick }) => (
  <div onClick={onClick} className={`${s.light} ${s[color]}`}>
    <div className={s.side}></div>
  </div>
  )

  return (<>
    <div ref={containerRef} style={containerStyles} className={`${s.container} ${width === undefined ? "w-100" : ""}`}>
      <div className={`flex h-100 justify-content-between`}>
        <div className={`flex flex-column justify-content-between ${s.lights}`}>
          <Led color="red"/>
          <Led color="yellow"/>
          <Led color="green"/>
          <Led color="white"/>
          <Led color="btn" onClick={handleOnConfirm}/>
          <div style={{ fontSize: height * 0.125 + "%" }} className={s.mark}>ARRAS</div>
        </div>
        <div className={`${s.numbers}`}>
          <Number value={1}/>
          <Number value={2}/>
          <Number value={3}/>
          <Number value={4}/>
          <Number value={5}/>
          <Number value={6}/>
          <Number value={7}/>
          <Number value={8}/>
          <Number value={9}/>
          <Number value={0}/>
        </div>
      </div>
    </div>
  </>)
}
