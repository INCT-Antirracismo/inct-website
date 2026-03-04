import { cn, createDynamicContentURL } from '@/lib/utils';
import { Media, ResearchProject } from '@/payload-types';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
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
  let itemsArr =
    block?.items?.length > 0
      ? block.items.map((i: any) => i.value)
      : items && items?.docs?.length > 0
        ? items.docs
        : [];
  if (!(itemsArr?.length > 0)) return null;
  return (
    <div className={cn('grid gap-x-6 gap-y-12 items-center')}>
      {itemsArr.map((doc: ResearchProject) => {
        return (
          <Link
            href={createDynamicContentURL(doc?.slug, 'researchProjects')}
            key={doc?.slug + '_publications'}
            className="grid gap-4 md:gap-6 items-center group"
          >
            <div className="">
              <h2 className="font-bold text-lg md:text-2xl lg:text-3xl mb-1 lg:mb-2 leading-tight text-balance decoration-trinidad underline-offset-2 decoration-2 group-hover:underline">
                {doc.name}
              </h2>
              <p className="text-sm md:text-base lg:text-lg md:leading-relaxed text-pretty max-w-prose">
                {doc.description!.slice(0, 160)}
                {doc.description!.length > 160 && '...'}
              </p>
              <p className="text-trinidad font-medium flex items-center gap-2">
                <AlertTriangle /> Adicionar membros aqui
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
