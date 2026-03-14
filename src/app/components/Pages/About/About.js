import DesktopAnimation from '../../DesktopAnimation/DesktopAnimation';
import styles from "./About.module.css"
import { animationScrollDuration } from '../../../constants/Constants';
import { useTranslations } from 'next-intl';
import AnimationHandler from '../../Utils/AnimationHandler';
import ScrollWhileInViewAnimation from '../../Utils/ScrollWhileInViewAnimation';

export default function About() {
  const t = useTranslations("About")

  const dotsDecorationVariants = {
    initial: {
      y: "10vh"
    },
    animate: {
      y: 0
    }
  }

  return (
    <div className={`section md:grid md:gap-4 md:grid-cols-12`}>
      <ScrollWhileInViewAnimation
        page={1}
        className={`${styles.colSpan1366Left}  flex flex-col items-center justify-center
        md:col-span-7 
        lg:col-span-6 
        xl:col-span-5 
        2xl:col-span-4`}
      >
        <div className='flex items-center w-100 flex-col mb-6'>
          <h2 className='mb-3 font-bold text-3xl'>{t("title")} 👋</h2>
          <h1 className='mb-6 text-2xl'>Software Engineer. 💻</h1>
          <div className='title-underline'></div>
        </div>
        <p className='mb-7'>{t("description")}</p>
      </ScrollWhileInViewAnimation>
      <div className={`md:flex col-start-7 col-span-6 md:col-span-5 lg:col-span-6 lg:col-start-7 flex-col items-center justify-center relative mt-4`}>
        <AnimationHandler
          isAnimationEnabled
          variants={dotsDecorationVariants}
          whileInView="animate"
          transition={{ duration: animationScrollDuration / 1000 }}
          className={styles.dots}
        />
        <div className='w-full flex justify-center'>
          <DesktopAnimation className="w-6/12 md:w-9/12 lg:w-full"/>
        </div>
      </div>
    </div>);
}