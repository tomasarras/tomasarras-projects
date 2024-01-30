import PortfolioSlideContainer from './Slides/PortfolioSlideContainer';
import PortfolioSlideOne from './Slides/PortfolioSlideOne';
import PortfolioSlideTwo from './Slides/PortfolioSlideTwo';
import PortfolioSlideThree from './Slides/PortfolioSlideThree';

export default function Portfolio() {

  return (
  <PortfolioSlideContainer className="section">
    <PortfolioSlideOne/>
    <PortfolioSlideTwo/>
    <PortfolioSlideThree/>
  </PortfolioSlideContainer>
  )
  
}