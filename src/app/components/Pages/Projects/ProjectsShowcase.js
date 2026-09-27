'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const [previewLayers, setPreviewLayers] = useState([active])

  useEffect(() => {
    setPreviewLayers(prev => (prev[prev.length - 1].slug === activeSlug ? prev : [...prev, active]))
  }, [activeSlug])

  // Warm the image cache for the rest of the projects one at a time, in order,
  // starting only once the first preview has actually loaded (avoids competing
  // with it for bandwidth on slow connections).
  const [preloadReady, setPreloadReady] = useState(false)
  const [preloadIndex, setPreloadIndex] = useState(1)
  const bootstrapped = useRef(false)
  const advancePreload = () => setPreloadIndex(i => i + 1)
  const preloadTarget = preloadReady && preloadIndex < projects.length ? projects[preloadIndex] : null

  return (<>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
      {projects.map(({ slug, title, description, tags, icon, image, githubButton, demoButton }) => (
        <div key={slug} className={`flex flex-col ${styles.thumbCard}`}>
          <div className={styles.thumb}>
            {image
              ? <Image src={image} alt={`${title} preview`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
              : (
                <div className={styles.previewPlaceholder}>
                  <span className={styles.previewInitial}>{title.charAt(0)}</span>
                  <p className={styles.previewCaption}>{previewPlaceholder}</p>
                </div>
              )}
          </div>
          <div className="flex flex-col flex-1 p-4">
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
          </div>
        </div>
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
      <div className="col-span-7 relative">
        <div className={`sticky top-28 ${styles.previewFrame}`}>
          {previewLayers.map((layer, i) => {
            const isTop = i === previewLayers.length - 1
            const isInitial = i === 0 && previewLayers.length === 1
            return (
              <div
                key={layer.slug}
                className={`${styles.previewLayer} ${isTop && previewLayers.length > 1 ? styles.previewLayerEnter : ''}`}
                onAnimationEnd={isTop ? () => setPreviewLayers(prev => (prev.length > 1 ? prev.slice(-1) : prev)) : undefined}
              >
                {layer.image
                  ? (
                    <Image
                      src={layer.image}
                      alt={`${layer.title} preview`}
                      fill
                      className="object-contain"
                      sizes="42vw"
                      onLoad={isInitial && !bootstrapped.current ? () => { bootstrapped.current = true; setPreloadReady(true) } : undefined}
                    />
                  )
                  : (
                    <div className={styles.previewPlaceholder}>
                      <span className={styles.previewInitial}>{layer.title.charAt(0)}</span>
                      <p className={styles.previewCaption}>{previewPlaceholder}</p>
                    </div>
                  )}
              </div>
            )
          })}
        </div>
        {preloadTarget?.image && (
          <div className={styles.previewPreload} aria-hidden="true">
            <Image
              key={preloadTarget.slug}
              src={preloadTarget.image}
              alt=""
              fill
              sizes="42vw"
              onLoad={advancePreload}
              onError={advancePreload}
            />
          </div>
        )}
      </div>
    </div>
  </>)
}
