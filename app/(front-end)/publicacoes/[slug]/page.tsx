import BlockRenderer from '@/components/blocks/BlockRenderer';
import FacePile from '@/components/Facepile';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import { applyPronounsToDefinedTerm, buildListSentence, cn } from '@/lib/utils';
import { DefinedTerm, Media, Person, Publication } from '@/payload-types';
import { ExternalLink } from 'lucide-react';
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
    <div className="container py-12 mx-auto">
      <div className="grid md:flex gap-4 md:gap-8 items-center group">
        <div className="h-64 w-full md:h-auto min-h-96 md:w-1/5 min-w-56 md:aspect-square  rounded flex items-center justify-center overflow-hidden relative p-0.5">
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
        <div>
          <Link href="/publicacoes">
            <h2
              id="publicações"
              className="uppercase text-xs md:text-sm tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance"
            >
              Publicações
            </h2>
          </Link>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 lg:mb-4 text-balance lg:max-w-5/6">
            {doc.name}
          </h1>

          {/* DESCRIÇÃO */}
          <p className="text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
            {doc.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 items-center">
            {doc.url ? (
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
            ) : null}
          </div>
        </div>
      </div>

      <div className="my-8 py-8 pb-6 border-y ">
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
      </div>

      <div className=" my-8">
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </div>
  );
}
