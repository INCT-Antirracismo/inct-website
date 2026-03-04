import BlockRenderer from '@/components/blocks/BlockRenderer';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { getDocBySlug } from '@/lib/local-api';
import { cn } from '@/lib/utils';
import { Media, Publication } from '@/payload-types';
import { Metadata } from 'next';
import Link from 'next/link';

export type PublicationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

export default async function PublicationPage({
  params
}: PublicationPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return <NotFound collectionSlug="publications" />;
  const createdAt = new Date(doc.createdAt || '');
  return (
    <>
      <div
        className={cn(
          'container mx-auto my-6 md:my-8 lg:my-12 grid md:items-center gap-8',
          Boolean(doc.image) && 'md:grid-cols-3'
        )}
      >
        <div className="h-full max-h-[60svh] bg-white rounded flex items-center justify-center overflow-hidden relative p-0.5">
          <img
            src={
              (doc.image as Media)?.sizes?.third?.url ||
              (doc.image as Media).url ||
              ''
            }
            className="relative z-2 w-full h-full object-contain"
            alt=""
          />
          <div
            className="absolute z-0 top-0 left-0 h-full w-full bg-cover bg-center blur-lg opacity-50"
            style={{
              backgroundImage: `url(${
                (doc.image as Media)?.sizes?.half?.url ||
                (doc.image as Media).url ||
                ''
              })`
            }}
          ></div>
        </div>
        <div
          className={cn(
            !Boolean(doc.image) ? 'md:text-center' : 'md:col-span-2'
          )}
        >
          <h1 className="md:mx-auto max-w-3xl leading-[1.2]! text-3xl md:text-4xl md:max-w-4xl lg:text-5xl lg:max-w-7xl tracking-tight text-dark-blue dark:text-zinc-50 text-balance font-bold">
            {doc.name}
          </h1>
          <p className="md:mx-auto max-w-prose w-full text-lg text-balance md:text-xl lg:text-2xl leading-snug text-stone-700 dark:text-zinc-100 mt-2 md:mt-3 xl:mt-5 lg:max-w-prose tracking-[0.018rem]">
            {doc.description}
          </p>
        </div>
      </div>
      <div className="mx-auto h-1 bg-trinidad max-w-sm rotate-2"></div>

      <div
        className={cn(
          'container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid',
          'justify-center'
        )}
      >
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </>
  );
}
