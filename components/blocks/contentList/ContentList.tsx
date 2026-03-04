import { Search } from '@/components/Search';
import { Media, Organization } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';
import Buttons from '../Buttons';
import PersonsList from '../PersonsList';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import OrganizationsList from '../OrganizationsList';
import PublicationsList from '../PublicationsList';
import ResearchProjectsList from '../ResearchProjectsList';
import EventsList from '../EventsList';
import PostsList from '../PostsList';
import Pagination from '@/components/Pagination';

export type ContentListProps = {
  block: any;
  collectionSlug: string;
  params?: {
    q: string;
    p: string;
  };
};

const payload = await getPayload({ config });

export default async function ContentList({
  block,
  collectionSlug,
  params
}: ContentListProps) {
  const { q: query, p: page } = params || {};
  const items = block.jsonQuery
    ? await payload.find({
        limit: 36,
        depth: 2,
        pagination: page ? page : false,
        page,
        ...block.jsonQuery,
        ...(query
          ? collectionSlug === 'persons'
            ? {
                where: {
                  or: [
                    {
                      name: {
                        like: query
                      }
                    },
                    {
                      description: {
                        like: query
                      }
                    },
                    { 'inctPosition.name': { like: query } },
                    { 'inctGroup.name': { like: query } },
                    {
                      slug: {
                        like: query
                      }
                    }
                  ]
                }
              }
            : ['publications', 'researchProjects', 'events', 'posts'].includes(
                  collectionSlug
                )
              ? {
                  where: {
                    or: [
                      {
                        name: {
                          like: query
                        }
                      },
                      {
                        description: {
                          like: query
                        }
                      }
                    ]
                  }
                }
              : {} // Tem query, mas não de persons
          : {}) // Não tem query
      })
    : false;
  return (
    <div className={cn('', collectionSlug === 'organizations' && 'bg-white')}>
      <div className="container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid">
        {/* Isso é o que vem antes da lists */}
        {block.name || block.description || block.buttons!.length > 0 ? (
          <div className="mb-8 border-b pb-3">
            {block.name ? (
              <h2 className="text-balance font-bold text-2xl mb-1">
                {block.name}
              </h2>
            ) : null}

            {block.description ? (
              <p className="text-balance text-muted-foreground mb-3">
                {block.description}
              </p>
            ) : null}
            {block.buttons!.length > 0 && (
              <div className=" mb-3 mt-2">
                <Buttons buttons={block.buttons} />
              </div>
            )}
          </div>
        ) : null}
        {block.jsonQuery && block.enableSearch ? (
          <div className="filters mb-8">
            <Search />
            <div className="my-8 h-1 bg-trinidad max-w-xs -rotate-1"></div>
          </div>
        ) : null}

        {/* Lista */}
        {collectionSlug === 'persons' ? (
          <PersonsList block={block} items={items as any} />
        ) : collectionSlug === 'organizations' ? (
          <div className="relative container p-0! -ml-4 lg:-ml-8">
            <div className="z-2 w-32 bg-linear-to-r absolute top-0 left-0 h-full from-white via-white/80 via-30% to-transparent"></div>
            <div className="z-2 w-32 bg-linear-to-l absolute top-0 right-0 h-full from-white via-white/80 via-30% to-transparent"></div>
            <OrganizationsList block={block} items={items as any} />
          </div>
        ) : collectionSlug == 'publications' ? (
          <PublicationsList block={block} items={items as any} />
        ) : collectionSlug == 'researchProjects' ? (
          <ResearchProjectsList block={block} items={items as any} />
        ) : collectionSlug == 'events' ? (
          <EventsList block={block} items={items as any} />
        ) : collectionSlug == 'posts' ? (
          <PostsList block={block} items={items as any} />
        ) : null}

        {block.jsonQuery && block.enableSearch ? (
          <div className="filters mb-8">
            <Pagination />
          </div>
        ) : null}
      </div>
    </div>
  );
}
