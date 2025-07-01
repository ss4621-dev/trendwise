import TrendingCard from '@/components/TrendingCard';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export default async function Home() {
  // Connect to database and fetch articles
  await dbConnect();
  const articles = await Article.find().sort({ createdAt: -1 }).limit(6);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Tech Insights</h1>
        <p className="text-xl text-gray-600">
          Discover trending topics generated with cutting-edge AI
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">No articles found. Generate your first article!</p>
          <a 
            href="/admin" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Admin Dashboard
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <TrendingCard key={article._id.toString()} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/admin" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Generate More Articles
            </a>
          </div>
        </>
      )}
    </main>
  );
}