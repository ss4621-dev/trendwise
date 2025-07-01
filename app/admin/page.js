'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  // Fetch articles
  useEffect(() => {
    if (status === 'authenticated') {
      fetchArticles();
    }
  }, [status]);
  
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateNewArticle = async () => {
    try {
      const res = await fetch('/api/articles/generate');
      const data = await res.json();
      
      if (data.success) {
        alert(`Article generated: ${data.article.title}`);
        fetchArticles();
      } else {
        alert('Error generating article');
      }
    } catch (error) {
      console.error('Error generating article:', error);
      alert('Error generating article');
    }
  };
  
  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-8">
        <button 
          onClick={generateNewArticle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate New Article
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
      
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.map(article => (
            <div key={article._id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">Created: {new Date(article.createdAt).toLocaleDateString()}</p>
              <a 
                href={`/article/${article.slug}`} 
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                View Article
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}