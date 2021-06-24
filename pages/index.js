import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// components
import Auth from '../components/Auth'

export default function Home() {
  return (
    <div>
      <Auth/>
    </div>
  )
}
