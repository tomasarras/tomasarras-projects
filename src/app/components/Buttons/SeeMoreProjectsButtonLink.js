import Image from 'next/image';
import rightArrow from "../../../../public/icons/right-arrow-dark.svg"
import styles from "./SeeMoreProjectsButtonLink.module.css"
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SeeMoreProjectsButtonLink({ link, className }) {
  const t = useTranslations("buttons")

  return (<>
    <Link href={link} className={`flex items-center link ${styles.anchor} ${className} as-text`}>{t("see-more-projects")} <Image className={`h-4 w-4 ml-2 invert-color ${styles.arrow}`} src={rightArrow} alt="right-arrow" /></Link>
  </>)
}
