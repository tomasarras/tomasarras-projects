import Projects from "@/app/components/Pages/Projects/Projects";
import { setRequestLocale } from 'next-intl/server';

export default function ProjectsPage({ params: { locale } }) {
  setRequestLocale(locale);

  return (
    <main>
      <Projects locale={locale}/>
    </main>
  );
}
