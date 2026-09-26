import PortfolioSlideContainer from './Slides/PortfolioSlideContainer';
import PortfolioSlideOne from './Slides/PortfolioSlideOne';
import PortfolioSlideTwo from './Slides/PortfolioSlideTwo';
import PortfolioSlideThree from './Slides/PortfolioSlideThree';
import PortfolioSlideFour from './Slides/PortfolioSlideFour';

export default function Portfolio() {

  return (
  <PortfolioSlideContainer className="section">
    <PortfolioSlideOne/>
    <PortfolioSlideTwo/>
    <PortfolioSlideThree/>
    <PortfolioSlideFour/>
  </PortfolioSlideContainer>
  )

}