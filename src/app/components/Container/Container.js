import s from './Container.module.css';

export default function Container({ children, page, fullContainerClassName, noHeaderPadding = false, center = false, noCenter = false, noPadding = false, className = "" }) {

  return (
  <section className={`${fullContainerClassName} w-full h-full`}>
    <div className={`${noPadding ? "" : "container"} ${noHeaderPadding ? "" : "sm:py-4"} h-full ${s.section} ${className}`}>
      <div className={`${noHeaderPadding ? "" : noCenter ? s.noCenter : s.div} h-full flex ${center ? "justify-center items-center" : ""}`}>
        {children}
      </div>
    </div>
  </section>
  )
}