import RadialDecorator from './RadialDecorator';

export default function RadialDecorators() {
  const radialSize = "min(1920px, 100vw)"
  const halfRadialSize = "min(960px, 50vw)"
  const negativeHalfRadialSize = "max(-960px, -50vw)"
  const thirdRadialSize = "min(1440px, 75vw)"

  return (
  <div className={"layer2"}>
    <RadialDecorator top={`50vh`} left={`${negativeHalfRadialSize}`}  size={radialSize} halfSize={halfRadialSize}/>
    <RadialDecorator top={`200vh`} left={`${halfRadialSize}`}  size={radialSize} halfSize={halfRadialSize}/>
    <RadialDecorator top={`300vh`} left={`${negativeHalfRadialSize}`}  size={radialSize} halfSize={halfRadialSize}/>
    <RadialDecorator top={`430vh`} left={`${thirdRadialSize}`}  size={radialSize} halfSize={halfRadialSize}/>
  </div>
  )
}
