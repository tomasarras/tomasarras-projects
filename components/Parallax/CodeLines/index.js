import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CodeLines({ width, height }) {

  return (<Image
    src="/icons/code.svg"
    alt="Lines"
    width={width}
    height={height}
  />);
}