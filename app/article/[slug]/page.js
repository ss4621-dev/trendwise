import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';
import Link from 'next/link';

export default async function ArticlePage({ params }) {
  await dbConnect();
  
  // Find article by slug
  const article = await Article.findOne({ slug: params.slug });
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-8">
          <span>
            Published on {new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {article.content}
        </div>
      </article>
    </div>
  );
}