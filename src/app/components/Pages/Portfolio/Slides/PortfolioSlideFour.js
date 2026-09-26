import { useTranslations, useLocale } from 'next-intl';
import SeeMoreProjectsButtonLink from '../../../Buttons/SeeMoreProjectsButtonLink';

export default function PortfolioSlideFour() {
  const t = useTranslations("Portfolio.slides.four")
  const locale = useLocale()

  return (
  <div className='container flex justify-center items-center'>
    <div className='sm:w-6/12 md:w-5/12 2xl:w-4/12'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='mb-4 text-5xl font-bold text-center'>{t("title")}</h2>
        <div className='title-underline'></div>
      </div>
      <p className='mt-6 text-center'>{t("description")}</p>
      <div className='flex justify-center mt-8'>
        <SeeMoreProjectsButtonLink link={`/${locale}/projects`}/>
      </div>
    </div>
  </div>)
}
