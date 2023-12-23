export const isMobileDevice = () => (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
//TODO: Screen.roeintation deprecation
export const easeInOutCirc = (currentTime, startValue, changeInValue, duration) => {
    console.log(currentTime, startValue, changeInValue, duration);
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return -changeInValue / 2 * (Math.sqrt(1 - currentTime * currentTime) - 1) + startValue;
    }
    currentTime -= 2;
    return changeInValue / 2 * (Math.sqrt(1 - currentTime * currentTime) + 1) + startValue;
}