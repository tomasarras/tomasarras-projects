import { useTranslations } from 'next-intl';

export default function PortfolioSlideOne() {
	const t = useTranslations("Portfolio.slides.one")

  return (
	<div className='container flex justify-center items-center'>
		<div className='sm:w-6/12 md:w-5/12 2xl:w-4/12'>
			<div className='flex flex-col justify-center items-center'>
				<h1 className='mb-4 text-5xl font-bold'>{t("title")}</h1>
				<div className='title-underline'></div>
			</div>
			<p className='mt-6'>{t("description")}</p>
		</div>
	</div>)
}