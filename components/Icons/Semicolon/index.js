import React from 'react';
import Image from 'next/image';

export default function Semicolon({ width, height }) {

  
  return (<Image
    src="/icons/semicolon.svg"
    alt="semicolon"
    width={width}
    height={height}
  />)
}