import Image from 'next/image';
import React, { useEffect } from 'react';
import phones from "../../../../public/portfolio/phones-1.png"
import GitHubButtonLink from '../../../Buttons/GitHubButtonLink';

export default function PortfolioSlideTwo({ isActive }) {

  return (
  <div className='container grid grid-cols-12 items-center'>
    <div className='w-full flex justify-center 
      col-span-12 
      sm:col-span-5 
      md:col-span-6
      lg:col-span-6 
      xl:col-span-5 xl:mt-8
      2xl:col-start-2 2xl:mt-0'>
        {/* TODO: en 2xl: se ve un poco estirada */}
      <Image src={phones} alt="phones" className='w-10/12 sm:w-full'/>
    </div>
    <div className='mt-4 
      col-span-12 
      sm:col-span-6 sm:col-start-7 
      md:col-span-5 md:col-start-8
      lg:col-start-8 
      2xl:col-span-4 2xl:col-start-8 
      '>
      <h2 className='text-center mb-4'>Spoiler Five</h2>
      <p>Una aplicacion similar a Spotify, donde se puede ver y buscar artistas, playlist, albums de distintos artistas. Esta aplicacion es un Demo no funcional desarrollado con Angular con el fin de replicar una aplicacion.</p>
      <GitHubButtonLink link="https://github.com/tomasarras/angular-spoiler-five" className="mt-8"/>
    </div>
  </div>)
  
}