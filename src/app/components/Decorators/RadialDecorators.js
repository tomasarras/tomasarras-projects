import RadialDecorator from './RadialDecorator';

export default function RadialDecorators() {
  const radialSize = "min(1920px, 100vw)"

  return (
  <div className={"layer2"}>
    <RadialDecorator top={`50vh`}  size={radialSize} left/>
    <RadialDecorator top={`200vh`} size={radialSize}/>
    <RadialDecorator top={`300vh`} size={radialSize} left/>
    <RadialDecorator top={`430vh`} size={radialSize}/>
  </div>
  )
}
