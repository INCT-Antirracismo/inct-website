import { Organization, Media } from '@/payload-types';
import Image from 'next/image';
import { PaginatedDocs, DataFromCollectionSlug } from 'payload';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Marquee from 'react-fast-marquee';

export type OrganizationsListProps = {
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

export default async function OrganizationsList({
  block,
  items
}: OrganizationsListProps) {
  return block.items?.length > 0 ? (
    <Marquee className="flex gap-3 items-center">
      {block.items
        .map((i: any) => i.value)
        .map((doc: Organization) => {
          console.log(doc);
          return (
            <div key={doc.id + 'org'} className="mx-8">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <Image
                      width={300}
                      height={400}
                      loading="lazy"
                      src={(doc.logo as Media)?.url || ''}
                      alt={doc.acronym || doc.name}
                      className="w-auto h-auto max-h-16 max-w-36 grow-0 mx-auto"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{doc.name}</p>
                </TooltipContent>
              </Tooltip>
              {/* <div className="text-xs text-balance">{doc.name}</div> */}
            </div>
          );
        })}
    </Marquee>
  ) : block.jsonQuery && items && items.docs?.length > 0 ? (
    <Marquee className="flex gap-3 items-center w-full relative" speed={20}>
      {items.docs.map((doc: any) => {
        if (doc)
          return (
            <div key={doc.id + 'org'} className="mx-8">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <Image
                      width={300}
                      height={400}
                      loading="lazy"
                      src={(doc.logo as Media)?.url || ''}
                      alt={doc.acronym || doc.name}
                      className="w-auto h-auto max-h-14 max-w-32 grow-0 mx-auto saturate-0 duration-150 hover:saturate-100"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{doc.name}</p>
                </TooltipContent>
              </Tooltip>
              {/* <div className="text-xs text-balance">{doc.name}</div> */}
            </div>
          );
      })}
    </Marquee>
  ) : null;
}
