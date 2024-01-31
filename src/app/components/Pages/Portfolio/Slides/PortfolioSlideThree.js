"use client"
import Image from 'next/image';
import desktop from '../../../../../../public/portfolio/macbook-pro2.png'
import GitHubButtonLink from '../../../Buttons/GitHubButtonLink';
import styles from "./PortfolioSlideThree.module.css"
import { animationScrollDuration } from '../../../../constants/Constants';
import OnlyDesktopAnimation from '@/app/components/Utils/OnlyDesktopAnimation';
import PortfolioSlideThreeDots from '@/app/components/ClientSideRendering/PortfolioSlideThreeDots';

export default function PortfolioSlideThree() {

  return (
    <div className='container grid grid-cols-12 items-center'>
      <div className={`w-full flex justify-center relative 
        col-span-12 
        sm:col-span-5 
        md:col-span-6
        lg:col-span-6 
        xl:col-span-5 xl:mt-8
        2xl:col-start-2 2xl:mt-0`}>
        <PortfolioSlideThreeDots/>
        <Image src={desktop} alt="laptop-calid-burn" className='w-10/12 sm:w-full'/>
      </div>
      <div className='mt-4 
        col-span-12 
        sm:col-span-6 sm:col-start-7 
        md:col-span-5 md:col-start-8
        lg:col-start-8 
        2xl:col-span-4 2xl:col-start-8 
        '>
        <h2 className='text-center mb-4'>CalidBurn</h2>
        <p>Es una aplicación descentralizada (DApp) de compra y venta de bienes a través de SmartContracts en la blockchain de Ethereum. Funciona por medio de contratos digitales donde ambas partes acuerdan entre si. Esta desarrollada con React y Spring</p>
        <GitHubButtonLink link="https://github.com/tomasarras/calidBurn" className="mt-8"/>
      </div>
    </div>)
  
}