import { cn } from '@/lib/utils';
import { ResearchProject } from '@/payload-types';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';

export type ResearchProjectsListProps = {
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

export default async function ResearchProjectsList({
  block,
  items
}: ResearchProjectsListProps) {
  return block.items?.length > 0 ? (
    <div
      className={cn(
        'grid lg:grid-cols-2 gap-x-6 gap-y-12 items-center',
        block.items.length === 1 && 'xl:grid-cols-1'
      )}
    >
      {block.items
        .map((i: any) => i.value)
        .map((doc: ResearchProject) => {
          return <div key={doc?.slug + '_researchProject'}>{doc.name}</div>;
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
            return <div key={doc?.slug + '_researchProject'}>{doc.name}</div>;
        })}
      </div>
    </>
  ) : null;
}
