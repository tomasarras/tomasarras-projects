import Image from 'next/image';
import rightArrow from "../../../../public/icons/right-arrow-dark.svg"
import styles from "./LiveDemoButtonLink.module.css"
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LiveDemoButtonLink({ link, className }) {
  const t = useTranslations("buttons")

  return (<>
    <Link target="_blank" rel="noopener noreferrer" href={link} className={`flex items-center link ${styles.anchor} ${className} as-text`}>{t("see-demo")} <Image className={`h-4 w-4 ml-2 invert-color ${styles.arrow}`} src={rightArrow} alt="right-arrow" /></Link>
  </>)
}
