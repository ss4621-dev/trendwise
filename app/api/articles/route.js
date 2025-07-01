import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}