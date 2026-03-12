import Link from 'next/link';
import styles from './[locale]/not-found.module.css';

export const metadata = {
  title: '404 - Página No Encontrada',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <html lang="es">
      <body>
        <div className={styles.container}>
          <div className={styles.glitchWrapper}>
            <h1 className={styles.glitch} data-text="404">404</h1>
            <h2 className={styles.subtitle}>NOT FOUND</h2>
          </div>
          <p className={styles.message}>
            La página que buscas no existe o fue movida.
          </p>
          <Link href="/" className={styles.homeButton}>
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
