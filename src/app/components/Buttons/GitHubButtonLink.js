import Image from 'next/image';
import githubIcon from "../../../../public/icons/github-white.svg"
import rightArrow from "../../../../public/icons/right-arrow-dark.svg"
import styles from "./GitHubButtonLink.module.css"
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function GitHubButtonLink({ link, className }) {
  const t = useTranslations("buttons")

  return (<>
    <Link target="_blank" rel="noopener noreferrer" href={link} className={`flex items-center link ${styles.anchor} ${className} as-text`}><Image className='h-8 w-8 me-2 invert-color' src={githubIcon} alt="github-icon"/> {t("see-code")} <Image className={`h-4 w-4 ml-2 invert-color ${styles.arrow}`} src={rightArrow} alt="right-arrow" /></Link>
  </>)
}