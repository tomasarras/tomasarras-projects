import AnimationHandler from '../../Utils/AnimationHandler';
import GradientBlob from './GradientBlob';

const HERO_ROLE = 'Full Stack Developer';

export default function Hero() {
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
    <div className='flex flex-col items-center justify-center h-full fl-1 relative'>
      <GradientBlob/>
      <AnimationHandler className={"relative flex flex-col items-center gap-2"} initial="hidden" animate="visible" variants={textAnimation}>
        <span className="semibold as-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>Tomas Arras</span>
        <span className="semibold theme-text-gray" style={{ fontSize: '1.3rem' }}>{HERO_ROLE}</span>
      </AnimationHandler>
    </div>
  );
}
