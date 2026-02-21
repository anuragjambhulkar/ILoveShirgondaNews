import { getCollection } from '@/lib/mongodb';

export default async function sitemap() {
    const baseUrl = 'https://news.iloveshrigonda.com';

    try {
        const news = await getCollection('news');
        const articles = await news.find({ status: 'published' }).sort({ createdAt: -1 }).toArray();

        // Map articles to sitemap entries
        const articleEntries = articles.map((article) => ({
            url: `${baseUrl}/article/${article._id || article.id}`,
            lastModified: article.updatedAt || article.createdAt || new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        // Static routes
        const routes = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
            // Note: Admin routes excluded as per user request
        ];

        return [...routes, ...articleEntries];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
        ];
    }
}
