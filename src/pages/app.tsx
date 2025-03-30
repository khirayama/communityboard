import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

type FeedType = 'all' | 'recommended' | 'filtered'
type SortOrder = 'location' | 'date'

export default function AppPage() {
  const { t } = useTranslation('common')
  const [activeTab, setActiveTab] = useState<FeedType>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('date')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/login')
        return
      }
      
      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>{t('loading')}</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
            >
              {t('logout')}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
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
