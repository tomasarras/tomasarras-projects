import React, { useContext, useEffect, useState } from 'react';
import styles from "./Experience.module.css";

export default function Experience() {

  const ItemContainer = ({ date, children }) => (
    <div className={`d-flex ${styles.item} p-4`}>
      <div className='w-4/12'>
        {date}
      </div>
      <div className='w-8/12'>
        {children}
      </div>
    </div>
  );

  return (
  <div className='w-100 h-100 align-center d-flex justify-between items-center'>
    <div className='w-6/12'>
      <div className='d-flex items-center w-100 flex-column mb-6'>
        <h1 className='mb-4 text-5xl font-bold'>Experience</h1>
        <div className='title-underline'></div>
      </div>
      <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
    </div>
    <div className='w-6/12 d-flex flex-col'>
      <ItemContainer date={"2023 - present"}>
        <h3>Backender</h3>
        <h4>Senior engeniier</h4>
        <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
      </ItemContainer>
      <ItemContainer date={"2021 - 2023"}>
        <h3>Backender</h3>
        <h4>Senior engeniier</h4>
        <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
      </ItemContainer>
    </div>
  </div>);
}