import { Inter } from "next/font/google";
import "./globals.css";
import { locales } from "@/i18n";
import { unstable_setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tomas Arras",
  description: "Tomas Arras Portfolio",
};

export default function RootLayout({ children, params: { locale, section } }) {
  unstable_setRequestLocale(locale);
  //TODO: spacing
  //TODO: lethargy dependency
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
