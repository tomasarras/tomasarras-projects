import React from 'react';
import s from "./BTTFCircuits.module.css";

export default function BTTFCircuits({ panel, remainingMode, width, height }) {
  
  return (<>
    <div className={s[`overall-container`]}>
      <div style={{width: width + "px", height: height + "px"}} className={`${s[`individual-time-circuit-wrapper-area`]} ${s[`individual-time-circuit-wrapper-area`]} ${s[`destination`]}`}>
        <div className={`${s["individual-time-circuit-content"]}`}>

          <div className={`${s["row-of-numbers-display-area"]}`}>
            <div className={`${s["sticker-label-container"]} ${s[`month`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`month`]}`}>MONTH</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-month"]}`}><div className={`${s["faded-eights"]}`}>888</div>{panel.destination.month}</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`day`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`day`]}`}>DAY</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-day"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.destination.day}</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`year`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`year`]}`}>YEAR</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-year"]}`}><div className={`${s["faded-eights"]}`}>8888</div>{panel.destination.year}</div>
            </div>

            <div className={`${s["console-am-pm-container"]} d-flex flex-column`}>
              <div className={`${s["console-display"]} ${s["console-am-pm"]}`}>
                <div className={`${s["am-label"]}`}>AM</div>
                <div className={`${s["indicator-light-container"]} d-flex w-100 justify-content-center`}>
                  <div className={`${s["indicator-light"]} ${s["am"]} ${remainingMode ? s["light-red"] : panel.destination.isAm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
                </div>
                <div className={`${s["pm-label"]}`}>PM</div>
                <div className={`${s["indicator-light-container"]} d-flex w-100 justify-content-center`}>
                  <div className={`${s["indicator-light"]} ${s["pm"]} ${remainingMode ? s["light-red"] : panel.destination.isPm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
                </div>
              </div>
            
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`hour`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`hour`]}`}>HOUR</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-hour"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.destination.hour}</div>
            </div>

            <div className={`${s["console-display"]} ${s["console-colon-lights"]}`}>
              <div className={`${s["indicator-light"]} ${s["top"]}`}>&nbsp;</div>
              <div className={`${s["indicator-light"]} ${s["bottom"]}`}>&nbsp;</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`min`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`min`]}`}>MIN</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-min"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.destination.min}</div>
            </div>
          </div>

          <div className={`${s["footer-label-container"]} d-flex justify-content-center`}>
            <div className={`${s["footer-label"]}`}>DESTINATION&nbsp;TIME</div>
          </div>

        </div>
      </div>

      <div style={{width: width + "px", height: height + "px"}} className={`${s[`individual-time-circuit-wrapper-area`]} ${s[`individual-time-circuit-wrapper-area`]} ${s[`present`]}`}>
        <div className={`${s["individual-time-circuit-content"]}`}>

          <div className={`${s["row-of-numbers-display-area"]}`}>
            <div className={`${s["sticker-label-container"]} ${s[`month`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`month`]}`}>MONTH</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-month"]}`}><div className={`${s["faded-eights"]}`}>888</div>{panel.lastTime.month}</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`day`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`day`]}`}>DAY</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-day"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.lastTime.day}</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`year`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`year`]}`}>YEAR</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-year"]}`}><div className={`${s["faded-eights"]}`}>8888</div>{panel.lastTime.year}</div>
            </div>

            <div className={`${s["console-am-pm-container"]} d-flex flex-column`}>
              <div className={`${s["console-display"]} ${s["console-am-pm"]}`}>
                <div className={`${s["am-label"]}`}>AM</div>
                <div className={`${s["indicator-light-container"]} d-flex w-100 justify-content-center`}>
                  <div className={`${s["indicator-light"]} ${s["am"]} ${panel.lastTime.isAm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
                </div>
                <div className={`${s["pm-label"]}`}>PM</div>
                <div className={`${s["indicator-light-container"]} d-flex w-100 justify-content-center`}>
                  <div className={`${s["indicator-light"]} ${s["am"]} ${panel.lastTime.isPm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
                </div>
              </div>
            
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`hour`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`hour`]}`}>HOUR</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-hour"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.lastTime.hour}</div>
            </div>

            <div className={`${s["console-display"]} ${s["console-colon-lights"]}`}>
              <div className={`${s["indicator-light"]} ${s["top"]}`}>&nbsp;</div>
              <div className={`${s["indicator-light"]} ${s["bottom"]}`}>&nbsp;</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`min`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`min`]}`}>MIN</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-min"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.present.min}</div>
            </div>
          </div>

          <div className={`${s["footer-label-container"]} d-flex justify-content-center`}>
            <div className={`${s["footer-label"]}`}>PRESENT&nbsp;TIME</div>
          </div>

        </div>
      </div>

      <div style={{width: width + "px", height: height + "px"}} className={`${s[`individual-time-circuit-wrapper-area`]} ${s[`individual-time-circuit-wrapper-area`]} ${s[`last-time-departed`]}`}>
        <div className={`${s["individual-time-circuit-content"]}`}>

          <div className={`${s["row-of-numbers-display-area"]}`}>
            <div className={`${s["sticker-label-container"]} ${s[`month`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`month`]}`}>MONTH</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-month"]}`}><div className={`${s["faded-eights"]}`}>888</div>{panel.lastTime.month}</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`day`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`day`]}`}>DAY</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-day"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.lastTime.day}</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`year`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`year`]}`}>YEAR</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-year"]}`}><div className={`${s["faded-eights"]}`}>8888</div>{panel.present.year}</div>
            </div>

            <div className={`${s["console-am-pm-container"]} d-flex flex-column`}>
              <div className={`${s["console-display"]} ${s["console-am-pm"]}`}>
                <div className={`${s["am-label"]}`}>AM</div>
                <div className={`${s["indicator-light-container"]} d-flex w-100 justify-content-center`}>
                  <div className={`${s["indicator-light"]} ${s["am"]} ${panel.present.isAm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
                </div>
                <div className={`${s["pm-label"]}`}>PM</div>
                <div className={`${s["indicator-light-container"]} d-flex w-100 justify-content-center`}>
                  <div className={`${s["indicator-light"]} ${s["am"]} ${panel.present.isPm ? s["light-on"] : s["light-off"]}`}>&nbsp;</div>
                </div>
              </div>
            
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`hour`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`hour`]}`}>HOUR</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-hour"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.present.hour}</div>
            </div>

            <div className={`${s["console-display"]} ${s["console-colon-lights"]}`}>
              <div className={`${s["indicator-light"]} ${s["top"]}`}>&nbsp;</div>
              <div className={`${s["indicator-light"]} ${s["bottom"]}`}>&nbsp;</div>
            </div>

            <div className={`${s["sticker-label-container"]} ${s[`min`]}`}>
              <div className='d-flex justify-content-center'>
                <div className={`${s["sticker-label"]} ${s[`min`]}`}>MIN</div>
              </div>
              <div className={`${s["console-display"]} ${s["lcd"]} ${s["console-min"]}`}><div className={`${s["faded-eights"]}`}>88</div>{panel.present.min}</div>
            </div>
          </div>

          <div className={`${s["footer-label-container"]} d-flex justify-content-center`}>
            <div className={`${s["footer-label"]}`}>LAST&nbsp;TIME&nbsp;DEPARTED</div>
          </div>

        </div>
      </div>

    </div>
  </>)
}