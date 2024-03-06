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
    <div className='flex flex-col items-center justify-center h-full'>
      {/* TODO: esta animacion la desactivo porque no se nota, ver si mejorarla */}
      {/* <AnimationHandler isAnimationEnabled initial="hidden" animate="visible" variants={faceAnimation} className={styles.faceLogoContainer}> */}
      <div className={styles.faceLogoContainer}>
        <FaceLogo/>
      </div>
      {/* </AnimationHandler> */}
      <AnimationHandler initial="hidden" animate="visible" variants={textAnimation}><h1  className={`mt-8 semibold`}>Hello friend.</h1></AnimationHandler>
    </div>
  );
}