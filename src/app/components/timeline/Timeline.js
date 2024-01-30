import { AnimatedExperienceTimelineItem } from '../ClientSideRendering/AnimatedExperienceTimelineItem';
import styles from './WorkTimeline.module.css'

const Badge = ({ children }) => (<span className="bg-accent text-accent-light text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{children}</span>);

const Item = ({ time, children, title, i, first, last, order }) => {
  
  return (
  <li className={`${styles.item} ${styles["order-" + i]} relative ps-4 pe-4 rounded`}>
    {/**TODO Dark?? */}
    <div className={`${styles.itemContainer} ${last ? styles.lastContainer : ""} ${first ? styles.firstContainer : "pt-4"} ps-4 border-s border-gray-200 dark:border-gray-700`}>
      <div className={`${styles.dotItem} absolute w-3 h-3 bg-gray-200 rounded-full border border-white dark:bg-gray-700`}></div>
      <AnimatedExperienceTimelineItem index={i}>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time}</time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {children}
      </AnimatedExperienceTimelineItem>
      {/* TODO normal debe ser text-gray-500 y dark 400 */}
    </div>
  </li>)
}

export default function WorkTimeline({ }) {

  return (
    <div>
      {/* TODO: present current month */}
      {/* TODO: Fullstack dev */}
      {/* TODO: check todo */}
      {/* TODO: badges icons */}
      <ol className={`md:grid md:grid-cols-2 ${styles.ol}`}>                  
        <Item i={0} total={4} time="February 2022 - 2024 (present)" title={<>BackEnd developer at <a href='https://www.certisur.com/' className='link hover'>CertiSur</a></>} first>
          <p className='text-gray-500 dark:text-gray-400 mb-3'>Development of microservices used for digital signature and issuance of digital certificates</p>
          <Badge>Spring</Badge>
          <Badge>Vue</Badge>
        </Item>
        {/**TODO: link en ingles https://www.taggify.net/en */}
        <Item i={1} total={4} time="September 2021 - February 2022" title={<>FullStack Developer at <a href='https://www.taggify.net/en' className='link hover'>Taggify</a></>}>
          <p className='text-gray-500 dark:text-gray-400 mb-3'>
            Development of a Demand Side Platform (DSP) with microservices.
          </p>
          <Badge>Laravel</Badge>
          <Badge>React</Badge>
          <Badge>ExpressJS</Badge>
        </Item>
        <Item i={2} total={4} time="January 2021 - September 2021" title={<>FullStack developer at <a href="https://www.ideaas.com.ar/" className='link hover'>IDEAAS</a></>}>
          <p className='text-gray-500 dark:text-gray-400 mb-3'>
            Development of a platform that is used to search for architects, works and products.
          </p>
          <Badge>Spring</Badge>
          <Badge>NextJS</Badge>
        </Item>
        {/**TODO: link en ingles https://www.unicen.edu.ar/english */}
        <Item i={3} total={4} time="January 2018 - December 2021" title={<>Graduated from the University of <a href='https://www.unicen.edu.ar/content/tandil' className='link hover'>UNICEN</a> in Tandil, Argentina</>} last><p className='text-gray-500 dark:text-gray-400 mb-3'>Graduated as a Software Developer.</p></Item>
      </ol>
    </div>
  )
}