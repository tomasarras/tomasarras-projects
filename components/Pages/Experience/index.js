import React, { useContext, useEffect, useState } from 'react';
import styles from "./Experience.module.css";
import WorkTimeline from '../../timeline';

export default function Experience() {

  return (
  <div className='w-100 container-100dvh align-center d-flex justify-between items-center'>
    <div className='flex'>
      <div className='w-6/12 me-2'>
        <div>
          <div className='d-flex items-center w-100 flex-column mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>Experience</h1>
            <div className='title-underline'></div>
          </div>
          <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis exercitationem labore architecto! Itaque, nesciunt obcaecati accusantium quo enim temporibus, nostrum praesentium consequuntur et sed provident impedit repellat reprehenderit iusto fuga.</p>
        </div>
      </div>
      <div className='w-6/12 d-flex flex-col ms-2'>
        <WorkTimeline/>
      </div>
    </div>
  </div>);
}