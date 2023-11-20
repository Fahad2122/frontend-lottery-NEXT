import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import LotteryEntrance from '@/components/LotteryEntrance'
// import ManualHeader from '@/components/ManualHeader'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Lottery DAPP</title>
        <meta name="description" content="Ethererum based lottery App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ManualHeader /> */}
      <Header />
      <LotteryEntrance />
    </>
  )
}
