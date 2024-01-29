import React from 'react';
import { useAnimationScroll } from '../../../hooks/useAnimationScroll';
import styles from "./Portfolio.module.css"
import AnimationHandler from '../../Utils/AnimationHandler';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import PortfolioSlideContainer from './Slides/PortfolioSlideContainer';
import PortfolioSlideOne from './Slides/PortfolioSlideOne';
import PortfolioSlideTwo from './Slides/PortfolioSlideTwo';
import PortfolioSlideThree from './Slides/PortfolioSlideThree';

export default function Portfolio({ innerRef }) {
  const animation = useAnimationScroll(4)
  const size = useWindowDimensions()

  return (
  <PortfolioSlideContainer innerRef={innerRef}>
    <PortfolioSlideOne/>
    <PortfolioSlideTwo/>
    <PortfolioSlideThree/>
  </PortfolioSlideContainer>
  )
  
}