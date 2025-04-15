import { Inter } from "next/font/google";
import "./globals.css";
import { locales } from "@/i18n";
import { setRequestLocale } from 'next-intl/server';
import Provider from "../providers/ThemeProvider";
import { useTranslations } from 'next-intl';

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
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel={t("see-code")} type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

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

        {/* alternate y canonical (para SEO) */}
        <link rel="alternate" hrefLang='es' href={`${baseUrl}`}/>
        {/* TODO: un alternate para m.tomasarras.com.ar */}
        {/* <link rel="alternate" media="only screen and (max-width: 640px)"/> */}
        {supportedLocales.map(loc =>
          <link key={loc} rel="alternate" hrefLang={loc} href={`${baseUrl}/${loc}`}/>)}
        <link rel="canonical" href={baseUrl} />

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"
        />
      </head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
