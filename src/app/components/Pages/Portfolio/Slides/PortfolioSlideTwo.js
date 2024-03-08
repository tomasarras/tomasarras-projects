import Image from 'next/image';
import phones from "../../../../../../public/portfolio/phones-1.png"
import GitHubButtonLink from '../../../Buttons/GitHubButtonLink';
import styles from "./PortfolioSlideTwo.module.css"
import { useTranslations } from 'next-intl';

export default function PortfolioSlideTwo() {
  const t = useTranslations("Portfolio.slides.two")

  return (
  <div className={`desktop-h-100-svh container grid grid-cols-12 items-center h-full`}>
    <div className={`w-full flex justify-center items-center sm:h-full sm:relative ${styles.phonesImageContainer}
      col-span-12 
      sm:col-span-5 
      md:col-span-6
      lg:col-span-6 
      xl:col-span-5 xl:mt-8
      2xl:col-start-2 2xl:mt-0`}>
      <div className={`sm:hidden w-10/12`}>
        <Image style={{ objectFit: "contain", maxHeight: "40vh", maxWidth: "100%" }} src={phones} alt="phones" />
      </div>
      <Image src={phones} alt="phones" className={`hidden sm:block w-full object-contain`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
    </div>
    <div className='mt-8 sm:mt-0 
      col-span-12 
      sm:col-span-6 sm:col-start-7 
      md:col-span-5 md:col-start-8
      lg:col-start-8 
      2xl:col-span-4 2xl:col-start-8 
      '>
      <h2 className='text-center mb-4 semibold'>Spoiler Five</h2>
      <p>{t("description")}</p>
      <GitHubButtonLink link="https://github.com/tomasarras/angular-spoiler-five" className="mt-8"/>
    </div>
  </div>)
  
}