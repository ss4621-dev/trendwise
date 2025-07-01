import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateArticle(topic) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-flash" });
    
    const prompt = `
    Create a comprehensive, SEO-optimized article about "${topic}" with the following structure:
    
    1. Create a compelling title
    2. Write an engaging 1-2 paragraph introduction
    3. Include 3-5 main sections with informative content
    4. Write a conclusion summarizing key points
    5. Provide 1-2 paragraph excerpt for preview
    6. Format the content in HTML with proper headings and paragraphs
    
    Output format:
    {
      "title": "Article Title",
      "excerpt": "Short preview text",
      "content": "HTML formatted content"
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini generation error:", error);
    return {
      title: `Exploring ${topic}`,
      excerpt: `An in-depth look at ${topic} and its implications`,
      content: `<p>This article explores the fascinating world of ${topic}.</p>`
    };
  }
}