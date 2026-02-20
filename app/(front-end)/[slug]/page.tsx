import BlockRenderer from '@/components/blocks/BlockRenderer';
import DefaultCTA from '@/components/blocks/DefaultCTA';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { getDocBySlug } from '@/lib/local-api';
import { Page } from '@/payload-types';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

export type PagePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: PagePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getDocBySlug('pages', slug)) as Page | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

export default async function PagePage({ params }: PagePageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('pages', slug)) as Page | null;
  if (!doc) return <NotFound collectionSlug="pages" />;
  return (
    <>
      {/* <div className="container mx-auto py-12 prose">
        <h1>{doc.name}</h1>
        <p className="lead">{doc.description}</p>
        <Link href={'/sitemap'}>Página Inicial</Link>
      </div> */}
      {doc.content?.map((block, index) => {
        return (
          <BlockRenderer
            key={slug + index + 'block' + block.id}
            block={block}
            index={index}
          />
        );
      })}
    </>
  );
}
