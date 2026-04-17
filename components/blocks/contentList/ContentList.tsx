import Pagination from '@/components/Pagination';
import { Search } from '@/components/Search';
import { cn } from '@/lib/utils';
import config from '@payload-config';
import { getPayload } from 'payload';
import Buttons from '../Buttons';
import EventsList from '../EventsList';
import OrganizationsList from '../OrganizationsList';
import PersonsList from '../PersonsList';
import PostsList from '../PostsList';
import PublicationsList from '../PublicationsList';
import ResearchProjectsList from '../ResearchProjectsList';

export type ContentListProps = {
  block: any;
  collectionSlug: string;
  params?: {
    q: string;
    p: string;
  };
  lang: string;
};

const payload = await getPayload({ config });

export default async function ContentList({
  block,
  collectionSlug,
  params,
  lang
}: ContentListProps) {
  const { q: query, p: page } = params || {};
  const items = block.jsonQuery
    ? await payload.find({
        limit: 32,
        depth: 2,
        pagination: true,
        page,
        locale: lang,
        fallbackLocale: 'pt-BR',
        ...block.jsonQuery,
        ...(query
          ? collectionSlug === 'persons'
            ? // Query se forem PERSONS
              {
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
              ? // Query se for PUBLICATIONS, RESEARCH PROJECTS, EVENTS OU POSTS
                {
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
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:pb-8 lg:pt-16 grid">
        {/* Isso é o que vem antes da lists */}
        {block.name || block.description || block.buttons!.length > 0 ? (
          <div
            className={cn(
              'mb-8 border-b pb-3',
              block.centered && 'text-center'
            )}
          >
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
        {block.jsonQuery && block.enableSearch ? <Search /> : null}

        {/* Lista */}
        {collectionSlug === 'persons' ? (
          <PersonsList block={block} items={items as any} />
        ) : collectionSlug === 'organizations' ? (
          <div className="w-swv overflow-hidden">
            <div className="relative container p-0! -ml-4 lg:-ml-8">
              <div className="z-2 w-32 bg-linear-to-r absolute top-0 left-0 h-full from-white via-white/80 via-30% to-transparent"></div>
              <div className="z-2 w-32 bg-linear-to-l absolute top-0 right-0 h-full from-white via-white/80 via-30% to-transparent"></div>
              <OrganizationsList block={block} items={items as any} />
            </div>
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

        {block.jsonQuery &&
        block.enableSearch &&
        items &&
        items.totalPages > 1 ? (
          <div className="filters mb-8">
            <Pagination config={items} loading={false} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
