import BlockRenderer from '@/components/blocks/BlockRenderer';
import NotFound from '@/components/NotFound';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import { cn } from '@/lib/utils';
import { Event, Media } from '@/payload-types';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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
      <header
        className={cn(
          'grid md:flex gap-4 md:gap-8 items-center group container pt-5 md:pt-10 mx-auto',
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
          <Link href="/eventos">
            <h2
              id="eventos"
              className="uppercase text-xs md:text-sm tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Eventos
            </h2>
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold mb-5 md:mb-8 text-pretty lg:max-w-5/6 leading-tight">
            {doc!.name}
          </h1>

          {/* DESCRIÇÃO */}
          <section className="my-5 md:my-8 pt-5 md:pt-8 border-t">
            <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Resumo
            </h2>
            <p className="text-lg lg:text-2xl text-pretty leading-normal! max-w-prose">
              {doc!.description}
            </p>
          </section>

          {doc!.url ? (
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant={'secondary'}
                className="hover:bg-white text-primary uppercase font-medium tracking-wide text-xs flex items-center"
                size="sm"
                asChild
              >
                <Link href={doc!.url || ''} target="_blank">
                  Site <ExternalLink />
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="container py-5 mx-auto max-w-4xl mb-16 lg:mb-24">
        {Boolean(doc!.address) ? (
          <section className="my-10 md:my-16">
            <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Endereço
            </h2>
            <div className="text-pretty prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-trinidad-600 prose-a:hover:text-trinidad-600 prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex]">
              <p>{doc!.address}</p>
            </div>
          </section>
        ) : null}
        {doc!.startDate ? (
          <section className="my-10 md:my-16">
            <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Data
            </h2>
            <div className="text-pretty prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-trinidad-600 prose-a:hover:text-trinidad-600 prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex]">
              {Boolean(doc!.startDate) && (
                <p>
                  {startDate.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
              {Boolean(doc!.endDate) && (
                <p>
                  {endDate.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </section>
        ) : null}

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
      </main>
    </>
  );
}
