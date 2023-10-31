import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BTTFCircuits from '../components/BTTFCircuits';
export default function Home({ destination, lastTime }) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Tomas Arras</title>
        <meta name="Tomas Arras" content="Tomas Arras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BTTFCircuits lastTime={new Date(lastTime)} destination={new Date(destination)}/>
      </main>
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  const { client } = require('../db');
  const db = client();
  const [bttf] = await db.any('SELECT * from bttf');
  return { props: { destination: bttf.destination.toISOString(), lastTime: bttf["last_time"].toISOString() } }
})
