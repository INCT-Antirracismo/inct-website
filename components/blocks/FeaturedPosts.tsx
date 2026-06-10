import Pagination from '@/components/Pagination';
import { Search } from '@/components/Search';
import { cn } from '@/lib/utils';
import { DynamicContentLink } from '@/lib/utils/DynamicContentLink';
import { Media, Post } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';

export type FeaturedPostsProps = {
  block: any;
  params?: {
    q: string;
    p: string;
  };
  lang: string;
};

const payload = await getPayload({ config });

export default async function FeaturedPosts({
  block,
  params,
  lang
}: FeaturedPostsProps) {
  const items = block.jsonQuery
    ? await payload.find({
        limit: 5,
        depth: 2,
        locale: lang,
        fallbackLocale: 'pt-BR',
        ...block.jsonQuery
      })
    : false;
  let itemsArr: Post[] =
    block?.items?.length > 0
      ? block.items.map((i: any) => i.value)
      : items && items?.docs?.length > 0
        ? items.docs
        : [];

  if (block.featured?.value.id) {
    itemsArr = itemsArr.filter((item) => item.id !== block.featured?.value.id);
  }

  const featured = block.featured?.value || itemsArr.shift();
  const featuredCreatedAt = new Date(featured.createdAt || '');

  return (
    <div className="">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:pb-8 lg:pt-16 grid">
        <DynamicContentLink
          slug={featured?.slug}
          collection="posts"
          key={`featured-${featured.id}`}
          className="grid xl:grid-cols-5 gap-4 lg:gap-8 group mb-8"
        >
          <div className="xl:col-span-3 relative aspect-video w-full shrink-0">
            <img
              className="w-full h-full object-cover object-center"
              src={
                (featured.image as Media)?.sizes?.full?.url ||
                (featured.image as Media)?.sizes?.half?.url ||
                (featured.image as Media)?.url ||
                ''
              }
              alt={(featured.image as Media)?.alt}
            />
          </div>
          <div className="xl:col-span-2">
            <p className="text-xs xl:text-sm text-muted-foreground mb-2">
              {featuredCreatedAt.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              })}
            </p>
            <h2 className="font-bold text-lg md:text-2xl lg:text-3xl 2xl:text-4xl mb-1 lg:mb-2 leading-tight text-pretty decoration-trinidad underline-offset-2 decoration-2 group-hover:underline max-w-prose">
              {featured.name}
            </h2>
            <p className="text-sm md:text-lg xl:text-xl text-muted-foreground  md:leading-normal text-pretty max-w-prose">
              {featured.description!.slice(0, 160)}
              {featured.description!.length > 160 && '...'}
            </p>
          </div>
        </DynamicContentLink>

        <div className="grid xl:grid-cols-2 gap-8">
          {itemsArr.map((post: Post, index: number) => {
            const createdAt = new Date(post.createdAt || '');
            return (
              <DynamicContentLink
                slug={post?.slug}
                collection="posts"
                key={`featured-${post.id}`}
                className={cn(
                  'grid gap-4 lg:gap-8 md:flex items-center group',
                  index + 1 === itemsArr.length &&
                    itemsArr.length % 2 === 1 &&
                    'xl:hidden'
                )}
              >
                <div className="relative aspect-video md:aspect-4/3 md:w-56 xl:w-48 2xl:w-64 shrink-0">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={
                      (post.image as Media)?.sizes?.thumbnail?.url ||
                      (post.image as Media)?.sizes?.half?.url ||
                      (post.image as Media)?.sizes?.third?.url ||
                      (post.image as Media)?.url ||
                      ''
                    }
                    alt={(post.image as Media)?.alt}
                  />
                </div>
                <div className="">
                  <p className="text-xs xl:text-sm text-muted-foreground mb-2">
                    {createdAt.toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <h2 className="font-bold text-lg lg:text-xl xl:text-lg 2xl:text-2xl mb-1 lg:mb-2 leading-tight text-balance decoration-trinidad underline-offset-2 decoration-2 group-hover:underline max-w-prose">
                    {post.name}
                  </h2>
                  <p className="text-sm md:text-base xl:text-sm 2xl:text-base text-muted-foreground  md:leading-normal text-pretty max-w-prose">
                    {post.description!.slice(0, 120)}
                    {post.description!.length > 120 && '...'}
                  </p>
                </div>
              </DynamicContentLink>
            );
          })}
        </div>
      </div>
      <hr className="my-8" />
    </div>
  );
}
