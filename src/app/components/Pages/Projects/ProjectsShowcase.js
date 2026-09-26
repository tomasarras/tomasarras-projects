'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '../../Card/Card';
import styles from './Projects.module.css';

function ProjectIcon({ icon, title }) {
  return (
    <div className={styles.icon}>
      {icon
        ? <Image src={icon} alt={`${title} icon`} fill className="object-cover" sizes="36px" />
        : <span className={styles.iconPlaceholder}>{title.charAt(0)}</span>}
    </div>
  )
}

export default function ProjectsShowcase({ projects, previewPlaceholder }) {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const active = projects.find(p => p.slug === activeSlug)

  return (<>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
      {projects.map(({ slug, title, description, tags, icon, githubButton, demoButton }) => (
        <Card key={slug} className={`flex flex-col ${styles.card}`}>
          <div className="flex items-center gap-3 mb-2">
            <ProjectIcon icon={icon} title={title} />
            <h2 className="semibold">{title}</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => <span key={tag} className={`theme-text-gray text-xs px-2 py-1 rounded-full ${styles.tag}`}>{tag}</span>)}
          </div>
          <p className="theme-text-gray flex-1">{description}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            {githubButton}
            {demoButton}
          </div>
        </Card>
      ))}
    </div>

    <div className="hidden lg:grid grid-cols-12 gap-10">
      <div className="col-span-5 flex flex-col gap-2">
        {projects.map(({ slug, title, description, tags, icon, githubButton, demoButton }) => (
          <div
            key={slug}
            onMouseEnter={() => setActiveSlug(slug)}
            onFocus={() => setActiveSlug(slug)}
            className={`p-5 rounded-xl ${styles.row} ${slug === activeSlug ? styles.rowActive : ''}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <ProjectIcon icon={icon} title={title} />
              <h2 className="semibold">{title}</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => <span key={tag} className={`theme-text-gray text-xs px-2 py-1 rounded-full ${styles.tag}`}>{tag}</span>)}
            </div>
            <p className="theme-text-gray mb-4">{description}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {githubButton}
              {demoButton}
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-7">
        <div className={`sticky ${styles.previewFrame}`}>
          {active.image
            ? <Image src={active.image} alt={`${active.title} preview`} fill className="object-cover" sizes="42vw" />
            : (
              <div className={styles.previewPlaceholder}>
                <span className={styles.previewInitial}>{active.title.charAt(0)}</span>
                <p className={styles.previewCaption}>{previewPlaceholder}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  </>)
}
