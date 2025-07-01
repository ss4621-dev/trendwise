import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

// Create model if doesn't exist, otherwise use existing
export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);