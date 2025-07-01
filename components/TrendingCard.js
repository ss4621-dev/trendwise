import Link from 'next/link';

export default function TrendingCard({ article }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{article.excerpt}</p>
        <Link 
          href={`/article/${article.slug}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}