import Image from 'next/image';
import React from 'react';
import phones from "../../../../public/portfolio/phones-1.png"

export default function PortfolioSlideTwo({  }) {

  return (
  <div className='container flex justify-center items-center'>
    <div>
      <Image src={phones} alt="phones"/>
    </div>
    <div>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores architecto alias doloremque tenetur est esse debitis, sequi iure provident doloribus iste inventore blanditiis! Ipsum, explicabo? Pariatur mollitia ut culpa.</p>
    </div>
  </div>)
  
}