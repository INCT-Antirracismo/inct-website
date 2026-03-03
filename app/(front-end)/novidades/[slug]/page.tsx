import BlockRenderer from '@/components/blocks/BlockRenderer';
import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { cn } from '@/lib/utils';
import { Media, Post } from '@/payload-types';
import Link from 'next/link';

export type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('posts', slug)) as Post | null;
  if (!doc) return <NotFound collectionSlug="posts" />;
  const createdAt = new Date(doc.createdAt || '');
  return (
    <>
      <div className="container mx-auto py-16 grid md:flex md:items-center gap-8">
        <div className="md:max-w-1/3 w-full">
          <img
            src={(doc.image as Media).url || ''}
            className="rounded"
            alt=""
          />
        </div>
        <div className={cn(!Boolean(doc.image) && 'md:text-center')}>
          <h1 className="md:mx-auto max-w-3xl leading-[1.2]! text-3xl md:text-4xl md:max-w-4xl lg:text-5xl lg:max-w-7xl tracking-tight text-dark-blue dark:text-zinc-50 text-balance font-bold">
            {doc.name}
          </h1>
          <p className="md:mx-auto max-w-prose w-full text-lg text-balance md:text-xl lg:text-2xl leading-snug text-stone-700 dark:text-zinc-100 mt-2 md:mt-3 xl:mt-5 lg:max-w-prose tracking-[0.018rem]">
            {doc.description}
          </p>
          <p className="text-xs lg:text-sm text-muted-foreground mt-5">
            Postado em{' '}
            {createdAt.toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            .
          </p>
        </div>
      </div>
      <div className="mx-auto h-1 bg-trinidad max-w-sm rotate-2"></div>
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
