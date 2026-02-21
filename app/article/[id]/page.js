import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ArticleContent from '@/components/ArticleContent';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const news = await getCollection('news');
    let article = null;

    if (ObjectId.isValid(id)) {
      article = await news.findOne({ _id: new ObjectId(id) });
    }

    if (!article) {
      article = await news.findOne({ id: id });
    }

    if (!article) return {};

    const title = `${article.title} - I Love Shrigonda News`;
    const description = article.excerpt || article.content?.substring(0, 160);

    // Fallback image source
    const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1495020689067-958852a7765e';

    const getImageUrl = (image) => {
      if (!image) return FALLBACK_IMAGE;
      if (image.startsWith('http') || image.startsWith('https')) return image;
      if (image.startsWith('photo-')) return `https://images.unsplash.com/${image}`;
      if (/^[a-zA-Z0-9_-]+$/.test(image)) return `https://images.unsplash.com/photo-${image}`;
      return FALLBACK_IMAGE;
    };

    const imageUrl = getImageUrl(article.image);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [imageUrl],
        type: 'article',
        publishedTime: article.createdAt,
        authors: [article.author || 'I Love Shrigonda News'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default function Page() {
  return <ArticleContent />;
}
