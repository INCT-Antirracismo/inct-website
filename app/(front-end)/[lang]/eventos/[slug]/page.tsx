import BlockRenderer from '@/components/blocks/BlockRenderer';
import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Event } from '@/payload-types';
import Link from 'next/link';

export type EventPageProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug('events', slug, lang)) as Event | null;
  if (!doc) return <NotFound collectionSlug="events" />;
  const startDate = new Date(doc.startDate || '');
  const endDate = new Date(doc.endDate || '');
  return (
    <>
      <div className="container mx-auto py-16">
        <div className="md:text-center">
          <h1 className="max-w-3xl leading-[1.2]! text-3xl md:text-4xl md:max-w-4xl lg:text-5xl lg:max-w-7xl tracking-tight text-dark-blue dark:text-zinc-50 text-balance font-bold">
            {doc.name}
          </h1>
          <p className="md:mx-auto max-w-prose w-full text-lg text-balance md:text-xl lg:text-2xl leading-snug text-stone-700 dark:text-zinc-100 mt-2 md:mt-3 xl:mt-5 lg:max-w-prose tracking-[0.018rem]">
            {doc.description}
          </p>
        </div>
      </div>
      <div className="border-y-2 border-sun md:text-center py-4">
        <div className="container mx-auto">
          {Boolean(doc.startDate) && (
            <p className="font-semibold text-primary">
              {startDate.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
          {Boolean(doc.endDate) && (
            <p className="font-semibold text-primary">
              {endDate.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
          {Boolean(doc.address) && <p>{doc.address}</p>}
          {Boolean(doc.url) && <p>{doc.url}</p>}
        </div>
      </div>

      {doc.content?.map((block, index) => {
        return (
          <BlockRenderer
            key={slug + index + 'block' + block.id}
            block={block}
            index={index}
            lang={lang}
          />
        );
      })}
    </>
  );
}
