import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Community Board</title>
        <meta name="description" content="A community board application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Community Board</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center">
              サインアップ
            </Link>
            <Link href="/login" className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-center">
              ログイン
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">簡単にボードを作成</h2>
              <p>必要な情報を共有するためのボードを簡単に作成できます。</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">リアルタイム更新</h2>
              <p>情報はリアルタイムで更新され、常に最新の状態を確認できます。</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">モバイル対応</h2>
              <p>スマートフォンやタブレットからも快適に利用できるレスポンシブデザイン。</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
