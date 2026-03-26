import { cn } from '@/lib/utils';
import { DynamicContentLink } from '@/lib/utils/DynamicContentLink';
import { Event, Media } from '@/payload-types';
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
          <DynamicContentLink
            key={doc?.slug + '_events'}
            className="grid grid-cols-3 gap-4 md:gap-6 items-center group"
            slug={doc?.slug}
            collection="events"
          >
            <div className="h-full md:h-auto md:aspect-3/2 bg-white rounded flex items-center justify-center overflow-hidden relative p-0.5">
              <img
                src={
                  (doc.image as Media)?.sizes?.thumbnail?.url ||
                  (doc.image as Media).url ||
                  ''
                }
                className="relative z-2 w-full h-full object-contain group-hover:scale-102 duration-300"
                alt=""
              />
              <div
                className="absolute z-0 top-0 left-0 h-full w-full bg-cover bg-center blur-lg opacity-50"
                style={{
                  backgroundImage: `url(${
                    (doc.image as Media)?.sizes?.thumbnail?.url ||
                    (doc.image as Media).url ||
                    ''
                  })`
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
              {Boolean(doc.address) && (
                <p className="text-sm text-deep-sea-green">{doc.address}</p>
              )}
            </div>
          </DynamicContentLink>
        );
      })}
    </div>
  );
}
