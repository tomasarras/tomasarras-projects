import Image from 'next/image';
import desktop from '../../../../../../public/portfolio/macbook-pro2.png'
import GitHubButtonLink from '../../../Buttons/GitHubButtonLink';
import PortfolioSlideThreeDots from '@/app/components/ClientSideRendering/PortfolioSlideThreeDots';
import { useTranslations } from 'next-intl';

export default function PortfolioSlideThree() {
  const t = useTranslations("Portfolio.slides.three")

  return (
    <div className='desktop-h-100-svh container grid grid-cols-12 items-center'>
      <div className={`w-full flex justify-center relative 
        col-span-12 
        sm:col-span-5 
        md:col-span-6
        lg:col-span-6 
        xl:col-span-5 xl:mt-8
        2xl:col-start-2 2xl:mt-0`}>
        <PortfolioSlideThreeDots/>
        <Image src={desktop} alt="laptop-calid-burn" className='w-10/12 sm:w-full' loading="lazy" sizes="(max-width: 640px) 83vw, (max-width: 768px) 42vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 42vw"/>
      </div>
      <div className='mt-8 sm:mt-0 
        col-span-12 
        sm:col-span-6 sm:col-start-7 
        md:col-span-5 md:col-start-8
        lg:col-start-8 
        2xl:col-span-4 2xl:col-start-8 
        '>
        <h2 className='text-center mb-4 semibold'>CalidBurn</h2>
        <p>{t("description")}</p>
        <GitHubButtonLink link="https://github.com/tomasarras/calidBurn" className="mt-8"/>
      </div>
    </div>)
  
}