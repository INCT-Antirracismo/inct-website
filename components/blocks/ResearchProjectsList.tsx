import { cn, createDynamicContentURL } from '@/lib/utils';
import { DefinedTerm, Media, ResearchProject } from '@/payload-types';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';
import FacePile from '../Facepile';

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
            className="grid gap-4 md:flex md:gap-6 items-center group"
          >
            <div className="">
              <p className="text-xs md:text-sm uppercase font-medium text-primary mb-2 tracking-widest">
                {(doc.status as DefinedTerm).name}
              </p>
              <h2 className="font-bold text-lg md:text-2xl lg:text-3xl mb-1 lg:mb-2 leading-tight text-balance decoration-trinidad underline-offset-2 decoration-2 group-hover:underline max-w-prose">
                {doc.name}
              </h2>
              <p className="text-sm md:text-base lg:text-lg md:leading-relaxed text-pretty max-w-prose">
                {doc.description!.slice(0, 160)}
                {doc.description!.length > 160 && '...'}
              </p>
              <div className="grid items-center gap-2 mt-3">
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  Pessoas deste INCT que participam
                </p>
                <FacePile members={doc.members?.docs as any} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
