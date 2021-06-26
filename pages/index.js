import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-2xl mb-6">ようこそ！</h1>
      <div>
        <Link href="/login">
          <a className="bg-gray-400 text-white rounded p-2 shadow hover:bg-red-400">ログインページ</a>
        </Link>
        <Link href="/register">
          <a className="bg-gray-400 text-white rounded p-2 shadow hover:bg-red-400 ml-3">新規作成ページ</a>
        </Link>
      </div>
    </div>
  )
}
