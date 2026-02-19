import DefaultCTA from '@/components/blocks/DefaultCTA';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
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
      {/* <div className="container mx-auto py-12 prose">
        <h1>{doc.name}</h1>
        <p className="lead">{doc.description}</p>
        <Link href={'/sitemap'}>Página Inicial</Link>
      </div> */}
      {doc.content?.map((block, index) => {
        if (block.blockType === 'defaultCTABlock') {
          return (
            <DefaultCTA
              key={`${doc.slug}_block_${block.id}_${index}`}
              {...block}
            />
          );
        }
        if (block.blockType === 'richTextBlock') {
          return (
            <div
              key={`${doc.slug}_block_${block.id}_${index}`}
              className="container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid justify-center"
            >
              <CustomRichText lexicalData={block.body as any} />
            </div>
          );
        }

        return (
          <div className="w-full">
            <code className="prose font-mono prose-sm wrap-normal">
              {JSON.stringify(block)}
            </code>
          </div>
        );
      })}
    </>
  );
}
