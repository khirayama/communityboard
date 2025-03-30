import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

type FeedType = 'all' | 'recommended' | 'filtered'
type SortOrder = 'location' | 'date'

export default function AppPage() {
  const { t } = useTranslation('common')
  const [activeTab, setActiveTab] = useState<FeedType>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('date')
  const [user, setUser] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: { range: 10, unit: 'km' },
    tags: [] as string[],
    keywords: '',
    users: [] as string[],
    organizations: [] as string[]
  })
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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              {t('filter.title')}
            </button>
            {showFilters && (
              <div className="absolute mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
                <div className="space-y-4 p-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      位置範囲 (km)
                    </label>
                    <select
                      value={filters.location.range}
                      onChange={(e) => setFilters({...filters, location: {...filters.location, range: Number(e.target.value)}})}
                      className="w-full p-2 border rounded"
                    >
                      {[1, 3, 5, 10, 20, 50].map((km) => (
                        <option key={km} value={km}>{km}km以内</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      タグ
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {filters.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {tag}
                          <button 
                            onClick={() => setFilters({...filters, tags: filters.tags.filter(t => t !== tag)})}
                            className="ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-l"
                        placeholder="タグを追加"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            setFilters({...filters, tags: [...filters.tags, e.currentTarget.value]});
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button 
                        className="px-3 bg-gray-200 rounded-r"
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="タグを追加"]') as HTMLInputElement;
                          if (input?.value) {
                            setFilters({...filters, tags: [...filters.tags, input.value]});
                            input.value = '';
                          }
                        }}
                      >
                        追加
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      キーワード
                    </label>
                    <input
                      type="text"
                      value={filters.keywords}
                      onChange={(e) => setFilters({...filters, keywords: e.target.value})}
                      className="w-full p-2 border rounded"
                      placeholder="キーワード検索"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setActiveTab('filtered')}
                    >
                      フィルター適用
                    </button>
                    <button 
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setFilters({
                        location: { range: 10, unit: 'km' },
                        tags: [],
                        keywords: '',
                        users: [],
                        organizations: []
                      })}
                    >
                      リセット
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
          <div className="p-8 border rounded-lg text-center">
            <p className="text-gray-500 mb-4">
              表示できるフィードがありません
            </p>
            <button
              onClick={() => {
                setFilters({
                  ...filters,
                  location: { range: 10, unit: 'km' }
                });
                setActiveTab('filtered');
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              現在地から10km以内のフィードを表示
            </button>
            <div className="mt-6">
              <Link href="/create-board" className="text-blue-500 hover:text-blue-700">
                  新しいボードを作成する
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
