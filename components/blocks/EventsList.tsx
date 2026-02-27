import { cn } from '@/lib/utils';
import { Event } from '@/payload-types';
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
  return block.items?.length > 0 ? (
    <div
      className={cn(
        'grid lg:grid-cols-2 gap-x-6 gap-y-12 items-center',
        block.items.length === 1 && 'xl:grid-cols-1'
      )}
    >
      {block.items
        .map((i: any) => i.value)
        .map((doc: Event) => {
          return <div key={doc?.slug + '_events'}>{doc.name}</div>;
        })}
    </div>
  ) : block.jsonQuery && items && items.docs?.length > 0 ? (
    <>
      <div
        className={cn(
          'grid lg:grid-cols-2 gap-x-6 gap-y-12 items-center',
          items.docs.length === 1 && 'xl:grid-cols-1'
        )}
      >
        {items.docs.map((doc: any) => {
          if (doc) return <div key={doc?.slug + '_events'}>{doc.name}</div>;
        })}
      </div>
    </>
  ) : null;
}
