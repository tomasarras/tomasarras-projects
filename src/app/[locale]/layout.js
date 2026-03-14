import { Inter } from "next/font/google";
import "./globals.css";
import { locales } from "@/i18n/request";
import { setRequestLocale } from 'next-intl/server';
import Provider from "../providers/ThemeProvider";
import { useTranslations } from 'next-intl';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  openGraph: {
    url: 'https://tomasarras.com.ar',
    image: 'https://tomasarras.com.ar/portrait/contact3.png'
  },
};

const supportedLocales = ['en', 'es']
const baseUrl = 'https://tomasarras.com.ar'

export default function RootLayout({ children, params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations("metatags")
  const canonicalUrl = locale === 'es' ? baseUrl : `${baseUrl}/${locale}`;
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* FAVICONS */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png"/>
        <link rel="icon" type="image/png" sizes="96x96"  href="/apple-touch-icon-96x96.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="128x128" href="/favicon-128x128.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="195x195"  href="/favicon-195x195.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png"/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>

        {/* interlinking (para SEO) TODO: agregar links que lleven a distintas secciones de la pagina */}

        {/* TODO: un alternate para m.tomasarras.com.ar */}
        {/* <link rel="alternate" media="only screen and (max-width: 640px)"/> */}
        {/* alternate y canonical (para SEO) */}
        {supportedLocales.map(loc =>
          <link key={loc} rel="alternate" hrefLang={loc} href={loc === 'es' ? baseUrl : `${baseUrl}/${loc}`}/>)}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" href={baseUrl} hreflang="x-default" />

        <title>{t("title")}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content={t("description")} />
        <meta property="keywords" content={t("keywords")} />
        <meta property="og:title" content={t("openGraph.title")} />
        <meta property="og:description" content={t("openGraph.description")} />
        <meta property="og:site_name" content={t("openGraph.siteName")} />
        <meta property="og:image" content="https://tomasarras.com.ar/portrait/contact3.png" />
        {/* TODO: cambiar og:image  */}
        <meta property="og:type" content="blog" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Cargar CSS de forma estándar */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"
          crossOrigin="anonymous"
        />
        
        {/* Structured Data JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "mainEntityOfPage": "https://tomasarras.com.ar",
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Tomas Arras",
            "url": canonicalUrl,
            "image": "https://tomasarras.com.ar/portrait/contact3.png",//TODO: cambiar foto
            "jobTitle": locale === 'es' ? "Desarrollador Web Full Stack" : "Full Stack Web Developer",
            "description": t("description"),
            "sameAs": [
              "https://www.linkedin.com/in/tomasarras",
              "https://github.com/tomasarras"
            ],
            "knowsAbout": ["React", "Spring Boot", "Node.js", "Express.js", "PostgreSQL", "MySQL", "JavaScript", "Web Development", "Full Stack Development"],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Universidad Nacional del Centro de la Provincia de Buenos Aires",
              "url": "https://www.unicen.edu.ar"
            },
            "worksFor": {
              "@type": "Organization",
              "name": "Certisur",
              "url": "https://www.certisur.com"
            }
          })
        }} />
      </head>
      <body className={inter.className}>
        {/* Google Analytics 4 - Optimizado para no ser render-blocking */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C9TZZJ5VPL"
          async
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C9TZZJ5VPL');
            `,
          }}
        />
        
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
