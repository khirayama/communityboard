import Head from 'next/head';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function AppPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>アプリ | Community Board</title>
        <meta name="description" content="Community Boardアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">ユーザー情報</h1>
          
          {user && (
            <div className="space-y-6 w-full">
              <ul className="space-y-3">
                <li className="border-b pb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </li>
                <li className="border-b pb-2">
                  <span className="font-semibold">最終ログイン:</span> {new Date(user.last_sign_in_at).toLocaleString()}
                </li>
                <li className="border-b pb-2">
                  <span className="font-semibold">ユーザーID:</span> {user.id}
                </li>
              </ul>

              <button
                onClick={handleLogout}
                className="w-full mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useState } from 'react'

type FeedType = 'all' | 'recommended' | 'filtered'
type SortOrder = 'location' | 'date'

export default function AppPage() {
  const { t } = useTranslation('common')
  const [activeTab, setActiveTab] = useState<FeedType>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('date')

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Head>

      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setSortOrder('date')}
              className={`px-3 py-1 rounded ${sortOrder === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {t('app.sort.date')}
            </button>
            <button
              onClick={() => setSortOrder('location')}
              className={`px-3 py-1 rounded ${sortOrder === 'location' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {t('app.sort.location')}
            </button>
          </div>
        </div>

        <div className="flex border-b mb-4">
          {(['all', 'recommended', 'filtered'] as FeedType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
            >
              {t(`app.tabs.${tab}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {/* フィードアイテムがここに表示されます */}
          <div className="p-4 border rounded">
            <p className="text-center text-gray-500">
              {t('app.empty-feed')}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
