import WorkTimeline from '../../timeline/Timeline';
import Image from 'next/image';
import experienceImageIllustration from "../../../../../public/experience-illustration.png"
import ScrollWhileInViewAnimation from '../../Utils/ScrollWhileInViewAnimation';
import { useTranslations } from 'next-intl';

export default function Experience() {
  const t = useTranslations("Experience")

  return (
  <div className='section mt-12 sm:mt-0 flex justify-between items-center'>
    <div className='grid mt-12 sm:mt-0 grid-cols-1 lg:grid-cols-12 lg:gap-4 2xl:grid-cols-12'>
      <ScrollWhileInViewAnimation page={3}
        className='xxl:flex xxl:items-center lg:col-span-4 xxl:col-span-6 2xl:col-span-4'>
        <div>
          <div className='flex items-center w-100 flex-col mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>{t("title")}</h1>
            <div className='title-underline'></div>
          </div>
          <p className='mb-10'>{t("description")}</p>
          <div className='hidden lg:flex justify-center'>
            <div className='sm:w-8/12 lg:w-full xl:w-8/12'>
              <Image src={experienceImageIllustration} alt='illustration'/>
            </div>
          </div>
        </div>
      </ScrollWhileInViewAnimation>
      <div className='lg:col-span-8 xxl:col-span-6 2xl:col-start-6 2xl:col-span-7'>
        <WorkTimeline/>
      </div>
    </div>
  </div>);
}