import ArticleContent from '@/components/ArticleContent';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { id: 'initial' } // Dummy ID to satisfy static export
  ];
}

export default function Page({ params }) {
  return <ArticleContent />;
}
