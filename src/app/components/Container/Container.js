import s from './Container.module.css';

export default function Container({ children, page, fullContainerClassName, noHeaderPadding = false, center = false, noCenter = false, noPadding = false, className = "" }) {

  return (
  <section className={`${s.f1} ${fullContainerClassName} w-full h-full`}>
    <div className={`${noPadding ? "" : "container"} ${noHeaderPadding ? "" : "sm:py-4"} h-full ${s.section} ${s.f1} ${className}`}>
      <div className={`${noHeaderPadding ? "" : noCenter ? s.noCenter : s.div} h-full flex ${s.f1} ${center ? "justify-center items-center" : ""}`}>
        {children}
      </div>
    </div>
  </section>
  )
}