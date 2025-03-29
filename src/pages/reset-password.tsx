import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // ここにパスワードリセットのロジックを実装
    console.log('パスワードリセット試行:', { email });
    
    // 成功した場合
    setSuccess(true);
  };

  return (
    <>
      <Head>
        <title>パスワードリセット | Community Board</title>
        <meta name="description" content="Community Boardのパスワードをリセット" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">パスワードリセット</h1>
          
          {success ? (
            <div className="p-4 bg-green-100 text-green-700 rounded-md mb-4">
              パスワードリセットのリンクをメールで送信しました。メールを確認してください。
              <div className="mt-4 text-center">
                <Link href="/login" className="text-blue-600 hover:underline">
                  ログインページに戻る
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              <p className="mb-4 text-gray-600">
                アカウントに登録されているメールアドレスを入力してください。パスワードリセットのリンクをメールで送信します。
              </p>
              
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  リセットリンクを送信
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <Link href="/login" className="text-sm text-blue-600 hover:underline">
                  ログインページに戻る
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
