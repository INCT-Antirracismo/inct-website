import DefaultCTA from '@/components/blocks/DefaultCTA';
import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Page } from '@/payload-types';
import Link from 'next/link';

export type PagePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PagePage({ params }: PagePageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('pages', slug)) as Page | null;
  if (!doc) return <NotFound collectionSlug="pages" />;
  return (
    <>
      <div className="container mx-auto py-12 prose">
        <h1>{doc.name}</h1>
        <p className="lead">{doc.description}</p>
        <Link href={'/'}>Página Inicial</Link>
      </div>
      {doc.content?.map((block, index) => {
        if (block.blockType === 'defaultCTABlock') {
          return (
            <DefaultCTA
              key={`${doc.slug}_block_${block.id}_${index}`}
              {...block}
            />
          );
        }
        return `block: ${block.blockType}`;
      })}
    </>
  );
}
