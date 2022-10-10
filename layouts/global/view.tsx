import Head from 'next/head'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
}

export const GlobalLayout = ({ children }: Props) => (
  <div className={styles.wrapper}>
    <Head>
      <title>SEVENROOMS Sample</title>
      <meta name="description" content="By Michelle Poon" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>{children}</main>

    <footer className={styles.footer}>
      Made by Michelle Poon, based on the SEVENROOMS reservation portal
    </footer>
  </div>
)
