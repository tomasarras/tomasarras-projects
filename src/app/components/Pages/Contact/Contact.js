import styles from "./Contact.module.css"
import Image from 'next/image';
import contactImg from "../../../../../public/portrait/contact3.png"
import Link from 'next/link';
import instagramIcon from "../../../../../public/icons/instagram-white.svg"
import githubIcon from "../../../../../public/icons/github-white.svg"
import linkedInIcon from "../../../../../public/icons/linkedin-white.svg"
import sendIcon from "../../../../../public/icons/send.svg"
import ScrollWhileInViewAnimation from '../../Utils/ScrollWhileInViewAnimation';
import { useTranslations } from 'next-intl';
import Button from "../../Buttons/Button";
import ButtonCopyEmail from "../../Buttons/ButtonCopyEmail";

export default function Contact() {
  const t = useTranslations("Contact")
  const icons = [
    {
      name: "GitHub",
      src: githubIcon,
      href: "https://github.com/tomasarras",
      alt: "github"
    },
    {
      name: "LinkedIn",
      src: linkedInIcon,
      href: "https://www.linkedin.com/in/tomas-arras-49b1aa1b6/",
      alt: "linkedin"
    },
    {
      name: "Instagram",
      src: instagramIcon,
      href: "https://www.instagram.com/tomasarras/",
      alt: "instagram"
    },
  ]

  return <div className={`section fl-1 grid grid-cols-1 md:gap-4 md:grid-cols-12`}>
  <ScrollWhileInViewAnimation 
    page={5}
    className={`${styles.textContainer} flex flex-col justify-center
    col-span-12  
    md:col-span-7 
    lg:col-span-6 
    xl:col-span-5 
    2xl:col-span-4`}
  >
    <div className='flex items-center w-100 flex-col mb-6'>
      <h1 className='mb-4 text-5xl font-bold'>{t("title")}</h1>
      <div className='title-underline'></div>
    </div>
    <div className={`mt-4 mb-8 md:hidden relative flex md:mt-0 col-span-1 md:flex col-start-7 col-span-6 md:col-span-5 lg:col-span-6 lg:col-start-7 flex-col items-center justify-center w-full`}>
      <div className={`${styles.imageContainer} flex justify-center items-center w-8/12`}>
        <Image className={`${styles.imagePortrait}`} alt="Tomas Arras" src={contactImg}/>
      </div>
    </div>
    <p className='mb-6'>{t("description")}</p>
    <h3>{t("social")}</h3>
    <div className={`flex mt-2 mb-4`}>
      {/**TODO hover */}
      {icons.map(icon => <Link key={icon.href} href={icon.href} passHref><Image className='h-10 w-10 me-2 invert-color' src={icon.src} alt={icon.alt} width={40} height={40}/></Link>)}
    </div>
    <h3>{t("email")}</h3>
    <div className="flex mt-2 items-center mb-8 sm:mb-0">
      <div className="w-full">
        <input type="text" id="disabled-input-2" aria-label="email" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="tomasarras@gmail.com" disabled readonly/>
      </div>
      <div className="ml-2">
        <ButtonCopyEmail copyText={t("button.copy")} copiedText={t("button.copied")}/>
      </div>
      <div className="ml-2">
        <Link href={"mailto:tomasarras@gmail.com"} passHref>
          <Button tooltip={t("button.send")}>
            <Image className='h-8 w-8' src={sendIcon} alt={"copy"} width={32} height={32}/>
          </Button>
        </Link>
      </div>
    </div>
  </ScrollWhileInViewAnimation>
  <div className={`${styles.imageWrapper} hidden md:block relative flex md:mt-0 col-span-1 md:flex col-start-7 col-span-6 md:col-span-5 lg:col-span-6 lg:col-start-7 flex-col items-center justify-center w-full`}>
    <div className={`${styles.imageContainer} flex justify-center items-center w-8/12`}>
      {/* TODO: next image loader */}
      {/* TODO: https://olaolu.dev/ decorar fondo de lineas */}
      <Image alt="Tomas Arras" src={contactImg}/>
    </div>
  </div>
</div>
  
}