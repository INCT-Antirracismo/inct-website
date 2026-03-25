import { cn } from '@/lib/utils';
import { DefinedTerm, ResearchProject } from '@/payload-types';
import Link from 'next/link';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';
import FacePile from '../Facepile';
import { createDynamicContentURL } from '@/lib/utils/createDynamicContentURL';

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
    <div className={cn('grid gap-x-8 gap-y-12 lg:grid-cols-2')}>
      {itemsArr.map((doc: ResearchProject) => {
        return (
          <article key={doc?.slug + '_publications'}>
            <p className="text-xs md:text-sm uppercase font-medium text-primary mb-2 tracking-widest">
              {(doc.status as DefinedTerm).name}
            </p>
            <Link href={createDynamicContentURL(doc?.slug, 'researchProjects')}>
              <h2 className="font-bold text-xl md:text-2xl mb-3 lg:mb-3 leading-tight text-pretty decoration-trinidad underline-offset-2 decoration-2 hover:underline max-w-prose">
                {doc.name}
              </h2>
            </Link>
            <p className="text-base lg:text-lg md:leading-relaxed text-pretty max-w-prose">
              {doc.description!.slice(0, 160)}
              {doc.description!.length > 160 && '...'}
            </p>
            <div className="grid items-center gap-2 mt-5">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Pessoas deste INCT que participam
              </p>
              <FacePile members={doc.members?.docs as any} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
