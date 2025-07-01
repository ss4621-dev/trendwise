import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';
import { generateArticle } from '@/lib/gemini';

export async function GET() {
  try {
    await dbConnect();
    
    // Mock trending topics - replace with real API later
    const mockTrends = [
      "Artificial Intelligence in Healthcare",
      "Sustainable Web Development",
      "Next.js 14 Features",
      "Web3 Development Trends",
      "CSS Frameworks Comparison"
    ];
    
    // Pick a random topic
    const topic = mockTrends[Math.floor(Math.random() * mockTrends.length)];
    
    // Generate article with Gemini
    const generated = await generateArticle(topic);
    
    // Create URL-friendly slug
    const slug = generated.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
    
    // Save to database
    const article = new Article({
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content: generated.content,
    });
    
    await article.save();
    
    return NextResponse.json({
      success: true,
      message: 'Article generated successfully',
      article: {
        id: article._id,
        title: article.title,
        slug: article.slug
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}