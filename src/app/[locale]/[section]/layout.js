import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "../../Context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tomas Arras",
  description: "Tomas Arras Portfolio",
};

export default function RootLayout({ children, params: { locale, section } }) {
  //TODO: spacing
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
