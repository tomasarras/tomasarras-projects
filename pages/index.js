import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BTTFCircuits from '../components/BTTFCircuits';
export default function Home() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Tomas Arras</title>
        <meta name="Tomas Arras" content="Tomas Arras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BTTFCircuits lastTime={yesterday} destination={tomorrow}/>
      </main>
    </div>
  )
}
