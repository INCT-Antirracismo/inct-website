import BlockRenderer from '@/components/blocks/BlockRenderer';
import PersonCard from '@/components/blocks/PersonCard';
import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { cn } from '@/lib/utils';
import { Media, Person, Post } from '@/payload-types';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export type PostPageProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug('posts', slug, lang)) as Post | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug('posts', slug, lang)) as Post | null;
  if (!doc) return <NotFound collectionSlug="posts" />;
  const createdAt = new Date(doc.createdAt || '');

  return (
    <>
      <header
        className={cn(
          'grid md:flex gap-8 items-center group container pt-5 md:pt-10 mx-auto',
          (doc!.image as Media)?.thumbnailURL || (doc!.image as Media).url
            ? ''
            : 'max-w-4xl'
        )}
      >
        {(doc!.image as Media)?.thumbnailURL || (doc!.image as Media).url ? (
          <div className="h-64 w-full md:h-auto min-h-96 md:w-1/3 min-w-56  rounded flex items-center justify-center overflow-hidden relative p-0.5 shrink-0">
            <img
              src={
                (doc!.image as Media)?.thumbnailURL ||
                (doc!.image as Media).url ||
                ''
              }
              className="relative z-2 w-full h-full object-contain group-hover:scale-102 duration-300"
              alt=""
            />
            <div
              className="absolute z-1 top-0 left-0 h-full w-full bg-cover bg-center blur-lg opacity-50"
              style={{
                backgroundImage: `url('${
                  (doc!.image as Media)?.thumbnailURL ||
                  (doc!.image as Media).url ||
                  ''
                }')`
              }}
            ></div>
          </div>
        ) : null}

        <div>
          <Link href="/novidades">
            <h2
              id="novidades"
              className="uppercase text-xs md:text-sm tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Novidades
            </h2>
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-5 text-pretty lg:max-w-5/6 leading-tight">
            {doc!.name}
          </h1>

          {/* DESCRIÇÃO */}
          <section>
            <p className="text-lg lg:text-2xl text-pretty leading-normal! max-w-prose">
              {doc!.description}
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
          </section>
        </div>
      </header>

      <main className="container py-5 mx-auto max-w-4xl mb-16 lg:mb-24">
        {doc!.content?.map((block, index) => {
          return (
            <BlockRenderer
              key={slug + index + 'block' + block.id}
              block={block}
              index={index}
              lang={lang}
            />
          );
        })}
        {doc?.author && doc?.author?.length > 0 ? (
          <div>
            <h3 className="text-muted-foreground text-xs tracking-widest uppercase mb-5">
              Autoria
            </h3>
            {doc.author.map((author: Person | string, index) => {
              if (typeof author === 'string') return null;
              return (
                <PersonCard
                  key={`postAuthor-${(author as Person).id}`}
                  person={author as Person}
                />
              );
            })}
          </div>
        ) : null}
      </main>
    </>
  );
}
