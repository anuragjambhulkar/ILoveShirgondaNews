import ArticleContent from '@/components/ArticleContent';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // We return a dummy param so the build succeeds.
  // The actual content is fetched on the client side in ArticleContent.
  return [{ id: '1' }];
}

export default function Page() {
  return <ArticleContent />;
}
