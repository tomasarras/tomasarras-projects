import Link from 'next/link';
import { useTranslations } from 'next-intl';
import GitHubButtonLink from '../../Buttons/GitHubButtonLink';
import LiveDemoButtonLink from '../../Buttons/LiveDemoButtonLink';
import ProjectsShowcase from './ProjectsShowcase';

const projectsData = [
  { slug: 'comanda', repo: 'comanda-demo', demo: 'https://comanda.tomasarras.com.ar/', tags: ['Next.js', 'Prisma', 'PostgreSQL'], icon: '/portfolio/icons/comanda.png', image: '/portfolio/comanda.png' },
  { slug: 'hambry', repo: 'hambry-demo', demo: 'https://hambry.tomasarras.com.ar/', tags: ['Next.js', 'Prisma', 'PostgreSQL'], icon: '/portfolio/icons/hambry.png', image: '/portfolio/hambry.png' },
  { slug: 'vestra', repo: 'vestra-demo', demo: 'https://vestra.tomasarras.com.ar/', tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel Blob'], icon: '/portfolio/icons/vestra.png', image: '/portfolio/vestra.png' },
  { slug: 'aerofind', repo: 'flight-booking-demo', demo: 'https://flightapp.tomasarras.com.ar/', tags: ['Next.js', 'React', 'Leaflet'], icon: '/portfolio/icons/aerofind.png', image: '/portfolio/aerofind.png' },
  { slug: 'butaca', repo: 'event-tickets-demo', demo: 'https://butaca.tomasarras.com.ar/', tags: ['Next.js', 'React', 'QR'], icon: '/portfolio/icons/butaca.png', image: '/portfolio/butaca.png' },
  { slug: 'pulsely', repo: 'saas-dashboard-demo', demo: 'https://pulsely.tomasarras.com.ar/', tags: ['Next.js', 'React', 'Recharts'], icon: '/portfolio/icons/pulsely.png', image: '/portfolio/macbook-pro2.png' },
  { slug: 'flowboard', repo: 'flowboard-demo', demo: 'https://flowboard.tomasarras.com.ar/', tags: ['Next.js', 'React', 'dnd-kit'], icon: '/portfolio/icons/flowboard.png', image: '/portfolio/flowboard.png' },
  { slug: 'mentora', repo: 'mentora-demo', demo: 'https://mentora.tomasarras.com.ar/', tags: ['Next.js', 'React'], icon: '/portfolio/icons/mentora.png', image: '/portfolio/mentora.png' },
  { slug: 'unibox', repo: 'unibox-demo', demo: 'https://unibox.tomasarras.com.ar/', tags: ['Next.js', 'React'], icon: '/portfolio/icons/unibox.png', image: '/portfolio/unibox.png' },
  { slug: 'nidora', repo: 'nidora-demo', demo: 'https://nidora.tomasarras.com.ar/', tags: ['Next.js', 'React', 'Leaflet'], icon: '/portfolio/icons/nidora.png', image: '/portfolio/nidora.png' },
  { slug: 'medora', repo: 'medora-demo', demo: 'https://medora.tomasarras.com.ar/', tags: ['Next.js', 'Prisma', 'PostgreSQL'], icon: '/portfolio/icons/medora.png', image: '/portfolio/medora.png' },
  { slug: 'spoilerfive', repo: 'angular-spoiler-five', demo: null, tags: ['Angular'], icon: null, image: '/portfolio/spoiler_five.png' },
  { slug: 'calidburn', repo: 'calidBurn', demo: null, tags: ['React', 'Spring', 'Ethereum'], icon: null, image: '/portfolio/calidburn.png' },
]

export default function Projects({ locale }) {
  const t = useTranslations("ProjectsPage")
  const otherLocale = locale === 'en' ? 'es' : 'en'

  const projects = projectsData.map(({ slug, repo, demo, tags, icon, image }) => ({
    slug,
    tags,
    icon,
    image,
    title: t(`projects.${slug}.title`),
    description: t(`projects.${slug}.description`),
    githubButton: <GitHubButtonLink link={`https://github.com/tomasarras/${repo}`}/>,
    demoButton: demo ? <LiveDemoButtonLink link={demo}/> : null,
  }))

  return (
    <div className="container py-24">
      <div className="flex justify-between items-center mb-12">
        <Link href={`/${locale}#portfolio`} className="link as-text">← {t("backLink")}</Link>
        <Link href={`/${otherLocale}/projects`} className="link as-text theme-text-gray">{otherLocale.toUpperCase()}</Link>
      </div>
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="mb-4 text-5xl font-bold">{t("title")}</h1>
        <div className="title-underline mb-6"></div>
        <p className="theme-text-gray max-w-xl">{t("subtitle")}</p>
      </div>
      <ProjectsShowcase projects={projects} previewPlaceholder={t("previewPlaceholder")} />
    </div>
  )
}
