import { Inter } from "next/font/google";
import "./globals.css";
import { locales } from "@/i18n";
import { unstable_setRequestLocale } from 'next-intl/server';
import Provider from "../providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tomas Arras",
  description: "Tomas Arras Portfolio",
};

const supportedLocales = ['en', 'es']
const baseUrl = 'https://tomasarras.com.ar'
const canonicalUrl = baseUrl + '/es'

export default function RootLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {supportedLocales.map(loc =>
          <link key={loc} rel="alternate" hrefLang={loc} href={`${baseUrl}/${loc}`}/>)}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Tomas Arras - Portfolio" />
        <meta property="og:description" content="Diseñador/Desarrollador" />
        <meta property="og:image" content="https://tomasarras.com.ar/portrait/contact3.png" />
        <meta property="og:url" content="https://tomasarras.com.ar" />
        <meta name="twitter:card" content="summary_large_image" />
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
