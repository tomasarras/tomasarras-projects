import styles from './Skills.module.css';
import Image from 'next/image';
import frontendImgDecoration from '../../../../../public/frontend-resize.png'
import devopsImgDecoration from '../../../../../public/devops-resize.png'
import backendImgDecoration from '../../../../../public/backend-resize.png'
import ScrollWhileInViewAnimation from '../../Utils/ScrollWhileInViewAnimation';
import DevIconAnimation from '../../Utils/DevIconAnimation';
import reactSvg from "../../../../../public/icons/react.svg";
import vueSvg from "../../../../../public/icons/vue.svg";
import bootstrapSvg from "../../../../../public/icons/bootstrap.svg";
import tailwindSvg from "../../../../../public/icons/tailwind.svg";
import dockerSvg from "../../../../../public/icons/docker.svg";
import gitSvg from "../../../../../public/icons/git.svg";
import postgresqlSvg from "../../../../../public/icons/postgresql.svg";
import postmanSvg from "../../../../../public/icons/postman.svg";
import springSvg from "../../../../../public/icons/spring.svg";
import javaSvg from "../../../../../public/icons/java.svg";
import awsSvg from "../../../../../public/icons/aws.svg";
import jenkinsSvg from "../../../../../public/icons/jenkins.svg";
import { HighlightedTypeImages } from '../../ClientSideRendering/HighlightedTypeImages';
import { HighlightedDevIcon } from '../../ClientSideRendering/HighlightedDevIcon';
import { SkillsIconLabel } from '../../ClientSideRendering/SkillsIconLabel';
import { useTranslations } from 'next-intl';

export default function Skills() {
  const t = useTranslations("Skills")

  const devIcons = [{
    src: reactSvg,
    name: "React",
    type: "frontend",
  },
  {
    src: vueSvg,
    name: "Vue",
    type: "frontend",
  },
  {
    src: bootstrapSvg,
    name: "Bootstrap",
    type: "frontend",
  },
  {
    src: tailwindSvg,
    name: "Tailwind",
    type: "frontend",
  },
  {
    src: dockerSvg,
    name: "Docker",
    type: "devops",
  },
  {
    src: gitSvg,
    name: "Git",
    type: "devops",
  },
  {
    src: postgresqlSvg,
    name: "PostgreSQL",
    type: "backend",
  },
  {
    src: postmanSvg,
    name: "Postman",
    type: "backend",
  },
  {
    src: springSvg,
    name: "Spring",
    type: "backend",
  },
  {
    src: javaSvg,
    name: "Java",
    type: "backend",
  },
  {
    src: awsSvg,
    name: "AWS",
    type: "devops",
  },
  {
    src: jenkinsSvg,//TODO: imagen estirada
    name: "Jenkins",
    type: "devops",
  }];

  return (
    <div className={`section flex-col flex justify-around`}>
      <div className={`xl:h-max w-full h-full flex flex-col sm:grid sm:gap-4 sm:grid-cols-12 items-center`}>
        <ScrollWhileInViewAnimation
          page={2}
          className='sm:col-span-6 md:col-span-5 2xl:col-span-4'
        >
          <div className='flex items-center w-100 flex-col mb-6'>
            <h1 className='mb-4 text-5xl font-bold'>{t("title")}</h1>
            <div className='title-underline'></div>
          </div>
          <p>{t("description")}</p>
        </ScrollWhileInViewAnimation>
  
        <div className='my-10 sm:my-0 w-full relative flex justify-center items-center relative
            sm:col-start-7 sm:col-span-6 
            md:col-start-7 md:col-span-6 
            lg:col-start-6 lg:col-span-7 
            xl:col-start-6 xl:col-span-7
            2xl:col-start-6 2xl:col-span-7 '>
          <div className={`sm:hidden ${styles.dots} absolute w-full h-50`}></div>
          <div className={`w-9/12 sm:w-full lg:w-4/5`}>
            <div className='relative top-0'>
              <div className={`hidden sm:block ${styles.dotsDesktop} ${styles.dots} absolute t-0 l-0 w-full h-50`}/>
              <ScrollWhileInViewAnimation page={2} intensity={.4}>
                <HighlightedTypeImages>
                  <Image src={frontendImgDecoration} alt='front-end'/>
                  <Image className="absolute top-0" src={devopsImgDecoration} alt='devops'/>
                  <Image className="absolute top-0" src={backendImgDecoration} alt='backend'/>
                </HighlightedTypeImages>
              </ScrollWhileInViewAnimation>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full ${styles.icons} sm:mb-12`}>
        <div className={`grid sm:gap-4 grid-cols-4 sm:grid-cols-6 mx-auto ${styles.iconsContainer}`}>
          {devIcons.map((icon, index) => (
            <DevIconAnimation
              className='flex flex-col justify-center items-center'
              key={index}
              index={index}
            >
              <div className={`${styles.devIconContainer} h-10 w-10 lg:h-14 lg:w-14 flex justify-center items-center`}>
                <HighlightedDevIcon type={icon.type}>
                  <Image
                    src={icon.src}
                    alt="icon"
                  />
                </HighlightedDevIcon>
              </div>
              <SkillsIconLabel type={icon.type}>
                <div className='text-center'>{icon.name}</div>
              </SkillsIconLabel>
            </DevIconAnimation>))}
        </div>
      </div>
    </div>
    
  );
}