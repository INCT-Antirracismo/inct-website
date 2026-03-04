import { cn, createDynamicContentURL } from '@/lib/utils';
import { Media, Event } from '@/payload-types';
import Link from 'next/link';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';

export type EventsListProps = {
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

export default async function EventsList({ block, items }: EventsListProps) {
  let itemsArr =
    block?.items?.length > 0
      ? block.items.map((i: any) => i.value)
      : items && items?.docs?.length > 0
        ? items.docs
        : [];
  if (!(itemsArr?.length > 0)) return null;
  return (
    <div className={cn('grid gap-x-6 gap-y-12 items-center')}>
      {itemsArr.map((doc: Event) => {
        const startDate = new Date(doc.startDate || '');
        const endDate = new Date(doc.endDate || '');
        return (
          <Link
            href={createDynamicContentURL(doc?.slug, 'events')}
            key={doc?.slug + '_events'}
            className=" group"
          >
            <h2 className="font-bold text-lg md:text-2xl lg:text-3xl mb-1 lg:mb-2 leading-tight text-balance decoration-trinidad underline-offset-2 decoration-2 group-hover:underline">
              {doc.name}
            </h2>
            <p className="text-sm md:text-base lg:text-lg md:leading-relaxed text-pretty">
              {' '}
              {doc.description!.slice(0, 160)}
              {doc.description!.length > 160 && '...'}
            </p>
            <p className="text-sm lg:text-base font-medium text-primary mt-2">
              {startDate.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              {doc.endDate ? (
                <>
                  {' '}
                  -{' '}
                  {endDate.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </>
              ) : null}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
