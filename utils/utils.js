import { lg, sm } from "../constants/Constants";

export const isMobileDevice = () => (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
//TODO: Screen.roeintation deprecation
export const easeInOutCirc = (currentTime, startValue, changeInValue, duration) => {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return -changeInValue / 2 * (Math.sqrt(1 - currentTime * currentTime) - 1) + startValue;
  }
  currentTime -= 2;
  return changeInValue / 2 * (Math.sqrt(1 - currentTime * currentTime) + 1) + startValue;
}

export const isDesktop = (size) => size !== undefined && size.width > lg
export const isTablet = (size) => size !== undefined && size.width <= lg && size.width > sm

export const isClient = () => typeof window !== "undefined"

export const getRequestAnimationFrame = () => window.requestAnimationFrame ||
                                              window.webkitRequestAnimationFrame ||
                                              window.mozRequestAnimationFrame    ||
                                              window.msRequestAnimationFrame;