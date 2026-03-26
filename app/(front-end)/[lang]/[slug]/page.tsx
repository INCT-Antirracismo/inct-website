import BlockRenderer from '@/components/blocks/BlockRenderer';
import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Page } from '@/payload-types';
import { Metadata, ResolvingMetadata } from 'next';

export type PagePageProps = {
  params: Promise<{ slug: string; lang: string }>;
  searchParams: Promise<{
    q: string;
    p: string;
  }>;
};

export async function generateMetadata(
  { params }: PagePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug('pages', slug, lang)) as Page | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

// export async function generateStaticParams() {
//   const payload = await getPayload({ config });
//   const { docs } = await payload.find({
//     collection: 'pages',
//     limit: 0,
//     select: { slug: true }
//   });
//   return docs.map((doc) => ({ slug: doc.slug }));
// }

export default async function PagePage({
  params,
  searchParams: searchParamsPromise
}: PagePageProps) {
  const searchParams = await searchParamsPromise;
  const { slug, lang } = await params;
  const doc = (await getDocBySlug('pages', slug, lang)) as Page | null;
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
            params={searchParams}
          />
        );
      })}
    </>
  );
}
