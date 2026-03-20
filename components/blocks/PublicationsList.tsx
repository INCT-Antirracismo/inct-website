import { cn, createDynamicContentURL } from '@/lib/utils';
import { Media, Publication } from '@/payload-types';
import Link from 'next/link';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';

export type PublicationsListProps = {
  block: any;
  items:
    | false
    | PaginatedDocs<
        DataFromCollectionSlug<
          | 'researchProjects'
          | 'publications'
          | 'organizations'
          | 'persons'
          | 'pages'
          | 'posts'
          | 'events'
          | 'media'
          | 'files'
          | 'definedTerms'
          | 'users'
          | 'payload-kv'
          | 'payload-locked-documents'
          | 'payload-preferences'
          | 'payload-migrations'
        >
      >;
};

export default async function PublicationsList({
  block,
  items
}: PublicationsListProps) {
  let itemsArr =
    block?.items?.length > 0
      ? block.items.map((i: any) => i.value)
      : items && items?.docs?.length > 0
        ? items.docs
        : [];
  if (!(itemsArr?.length > 0)) return null;
  return (
    <div className={cn('grid gap-x-6 gap-y-12 items-center')}>
      {itemsArr.map((doc: Publication) => {
        const datePublished = new Date(doc.datePublished || '');
        return (
          <Link
            href={createDynamicContentURL(doc?.slug, 'publications')}
            key={doc?.slug + '_publications'}
            className="grid grid-cols-3 gap-4 md:gap-6 items-center group"
          >
            <div className="h-full md:h-auto md:aspect-3/2 bg-white rounded flex items-center justify-center overflow-hidden relative p-0.5">
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
            <div className="col-span-2">
              <h2 className="font-bold text-lg md:text-2xl lg:text-3xl mb-1 lg:mb-2 leading-tight text-balance decoration-trinidad underline-offset-2 decoration-2 group-hover:underline">
                {doc.name}
              </h2>
              <p className="text-sm md:text-base lg:text-lg md:leading-relaxed text-pretty">
                {' '}
                {doc.description!.slice(0, 160)}
                {doc.description!.length > 160 && '...'}
              </p>
              <p className="text-sm lg:text-base font-medium text-primary mt-2">
                {datePublished.toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
