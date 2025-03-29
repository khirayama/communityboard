import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setError(error.message);
      return;
    }
    
    setSuccess(true);
  };

  return (
    <>
      <Head>
        <title>サインアップ | Community Board</title>
        <meta name="description" content="サインアップしてCommunity Boardを利用開始" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">サインアップ</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">8文字以上の英数字を入力してください</p>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              アカウントを作成
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちですか？ 
              <Link href="/login" className="text-blue-600 hover:underline">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
