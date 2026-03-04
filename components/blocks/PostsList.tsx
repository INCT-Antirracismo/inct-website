import { cn, createDynamicContentURL } from '@/lib/utils';
import { Post } from '@/payload-types';
import Link from 'next/link';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';

export type PostsListProps = {
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

export default async function PostsList({ block, items }: PostsListProps) {
  let itemsArr =
    block.items.length > 0
      ? block.items
      : items && items?.docs?.length > 0
        ? items.docs
        : [];
  if (!(itemsArr?.length > 0)) return null;
  return (
    <div
      className={cn(
        'grid lg:grid-cols-2 gap-x-6 gap-y-12 items-center',
        itemsArr.length === 1 && 'xl:grid-cols-1'
      )}
    >
      {itemsArr
        .map((i: any) => i.value)
        .map((doc: Post) => {
          return (
            <div key={doc?.slug + '_posts'}>
              <Link href={createDynamicContentURL(doc?.slug, 'posts')}>
                {doc.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
