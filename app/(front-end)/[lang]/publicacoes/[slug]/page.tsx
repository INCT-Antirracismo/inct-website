import BlockRenderer from '@/components/blocks/BlockRenderer';
import CollapsibleBodyContent from '@/components/CollapsibleBodyContent';
import FacePile from '@/components/Facepile';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import { applyPronounsToDefinedTerm, buildListSentence, cn } from '@/lib/utils';
import { DefinedTerm, Media, Person, Publication } from '@/payload-types';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { File } from '@/payload-types';

export type PublicationPageProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export async function generateMetadata({
  params
}: PublicationPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug(
    'publications',
    slug,
    lang
  )) as Publication | null;
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
  const datePublished = new Date(doc.datePublished || '');

  return (
    <>
      <header
        className={cn(
          'grid md:flex gap-4 md:gap-8 items-center group container pt-5 md:pt-10 mx-auto',
          (doc.image as Media)?.thumbnailURL || (doc.image as Media).url
            ? ''
            : 'max-w-4xl'
        )}
      >
        {(doc.image as Media)?.thumbnailURL || (doc.image as Media).url ? (
          <div className="h-64 w-full md:h-auto min-h-96 md:w-1/3 min-w-56  rounded flex items-center justify-center overflow-hidden relative p-0.5 shrink-0">
            <img
              src={
                (doc.image as Media)?.thumbnailURL ||
                (doc.image as Media).url ||
                ''
              }
              className="relative z-2 w-full h-full object-contain group-hover:scale-102 duration-300"
              alt=""
            />
            <div
              className="absolute z-1 top-0 left-0 h-full w-full bg-cover bg-center blur-lg opacity-50"
              style={{
                backgroundImage: `url('${
                  (doc.image as Media)?.thumbnailURL ||
                  (doc.image as Media).url ||
                  ''
                }')`
              }}
            ></div>
          </div>
        ) : null}

        <div>
          <Link href="/publicacoes">
            <h2
              id="publicacoes"
              className="uppercase text-xs md:text-sm tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Publicações
            </h2>
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-8 text-pretty lg:max-w-5/6 leading-tight">
            {doc.name}
          </h1>

          {/* DESCRIÇÃO */}
          <section className="my-5 md:my-8 pt-5 md:pt-8 border-t">
            <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Resumo
            </h2>
            <p className="text-lg lg:text-2xl text-pretty leading-normal! max-w-prose">
              {doc.description}
            </p>
          </section>

          {doc.url ? (
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant={'secondary'}
                className="hover:bg-white text-primary uppercase font-medium tracking-wide text-xs flex items-center"
                size="sm"
                asChild
              >
                <Link href={doc.url} target="_blank">
                  Site <ExternalLink />
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="container py-5 mx-auto max-w-4xl">
        <section className="my-5 md:my-8 pt-5 md:pt-8 border-t">
          <p className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
            Autoria
          </p>
          <h3 className="font-normal md:text-lg max-w-prose text-balance mb-2">
            {doc.creditText}
          </h3>
          {doc.author && doc.author.length > 0 && (
            <div className="grid items-center gap-2 mt-5">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Pessoas deste INCT que participam
              </p>
              <FacePile
                members={
                  doc.author?.map((relation) => {
                    const person = relation.relationTo.value as Person;
                    return person;
                  }) as Person[]
                }
              />
            </div>
          )}
        </section>
        {doc.datePublished ? (
          <section className="my-10 md:my-16">
            <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Data de publicação
            </h2>
            <div className="text-pretty prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-trinidad-600 prose-a:hover:text-trinidad-600 prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex]">
              <p>{datePublished.toLocaleDateString('pt-BR')}</p>
            </div>
          </section>
        ) : null}

        {doc.citation ? (
          <section className="my-10 md:my-16">
            <h2 className="mb-2 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Citação
            </h2>
            <div className="text-pretty prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-trinidad-600 prose-a:hover:text-trinidad-600 prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex]">
              <blockquote>{doc.citation}</blockquote>
            </div>
          </section>
        ) : null}

        {doc.files && doc.files.length > 0 && (
          <section className="my-10 md:my-16">
            <h2 className="mb-2 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
              Arquivos
            </h2>
            {doc.files?.map((file) => {
              return (
                <Button key={file.id} asChild>
                  <Link href={(file.file as File).url || ''} download={true}>
                    Baixar "{(file.file as File).alt}" <Download />
                  </Link>
                </Button>
              );
            })}
          </section>
        )}

        <section className="my-10 md:my-16">
          <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
            Sobre
          </h2>
          <CollapsibleBodyContent body={doc.body} />
        </section>
      </main>
    </>
  );
}
