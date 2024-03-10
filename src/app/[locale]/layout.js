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

export default function RootLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);
  //TODO: lethargy dependency
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
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
