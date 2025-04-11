import styles from './Hero.module.css';
import FaceLogo from '../../FaceLogo/FaceLogo';
import AnimationHandler from '../../Utils/AnimationHandler';
export default function Hero() {
  const faceAnimation = {
    hidden: {
      y:100,
      opacity:0
    },
    visible: {
      y:0,
      opacity:1,
      transition: {
        duration: 0.2
      }
    }
  }

  const textAnimation = {
    hidden: {
      y:100,
      opacity:0
    },
    visible: {
      y:0,
      opacity:1,
      transition: {
        delay: 0.2
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full fl-1'>
      {/* TODO: esta animacion la desactivo porque no se nota, ver si mejorarla */}
      {/* <AnimationHandler isAnimationEnabled initial="hidden" animate="visible" variants={faceAnimation} className={styles.faceLogoContainer}> */}
      <div className={styles.faceLogoContainer}>
        <FaceLogo/>
      </div>
      {/* </AnimationHandler> */}
      <AnimationHandler className={"mt-8"} initial="hidden" animate="visible" variants={textAnimation}><span className={`semibold as-title`}>Hello friend</span></AnimationHandler>
    </div>
  );
}