import { cn } from '@/lib/utils';
import { DynamicContentLink } from '@/lib/utils/DynamicContentLink';
import { DefinedTerm, Media, Publication } from '@/payload-types';
import { DataFromCollectionSlug, PaginatedDocs } from 'payload';
import FacePile from '../Facepile';

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
        return (
          <article
            key={doc?.slug + '_publications'}
            className="grid grid-cols-3 gap-4 md:gap-6 group"
          >
            <div className="h-full md:h-auto md:aspect-3/2 bg-white rounded flex items-center justify-center overflow-hidden relative p-0.5">
              <DynamicContentLink slug={doc?.slug} collection="publications">
                <img
                  src={
                    (doc.image as Media)?.thumbnailURL ||
                    (doc.image as Media).url ||
                    ''
                  }
                  className="relative z-2 w-full h-full object-contain group-hover:scale-102 duration-300"
                  alt=""
                />
              </DynamicContentLink>
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
              <p className="text-xs md:text-sm uppercase font-medium text-primary mb-2 tracking-widest">
                {(doc.type as DefinedTerm).name}
              </p>
              <DynamicContentLink slug={doc?.slug} collection="publications">
                <h2 className="font-bold text-xl md:text-2xl mb-3 lg:mb-3 leading-tight text-pretty decoration-trinidad underline-offset-2 decoration-2 hover:underline max-w-prose">
                  {doc.name}
                </h2>
              </DynamicContentLink>
              <p className="text-base lg:text-lg md:leading-relaxed text-pretty max-w-prose">
                {doc.description?.slice(0, 160)}
                {doc.description && doc.description?.length > 160 && '...'}
              </p>
              <div className="grid items-center gap-2 mt-5">
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  Pessoas deste INCT que participam
                </p>
                <FacePile
                  members={doc.author?.map((a) => a.relationTo.value) as any}
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
