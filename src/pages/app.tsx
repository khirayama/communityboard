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
