import React from 'react';
import Image from 'next/image';

export default function Dev({ width, height }) {

  
  return (<Image
    src="/icons/dev.svg"
    alt="dev"
    width={width}
    height={height}
  />)
}