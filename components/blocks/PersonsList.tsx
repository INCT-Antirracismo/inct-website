import { cn } from '@/lib/utils';
import { Person } from '@/payload-types';
import PersonCard from './PersonCard';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';

export type PersonsListProps = {
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

export default async function PersonsList({ block, items }: PersonsListProps) {
  return block.items?.length > 0 ? (
    <div
      className={cn(
        'grid lg:grid-cols-2 gap-x-6 gap-y-12 items-center',
        block.items.length === 1 && 'xl:grid-cols-1'
      )}
    >
      {block.items
        .map((i: any) => i.value)
        .map((doc: Person) => {
          return <PersonCard key={doc.id + '_person'} person={doc} />;
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
          if (doc)
            return <PersonCard key={doc?.slug + '_person'} person={doc} />;
        })}
      </div>
    </>
  ) : null;
}
