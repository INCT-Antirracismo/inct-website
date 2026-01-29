import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import { DefinedTerm, Person } from '@/payload-types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export type PersonPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug: pageSlug } = await params;
  const doc = (await getDocBySlug('persons', pageSlug)) as Person | null;
  if (!doc) return <NotFound collectionSlug="persons" />;
  const {
    createdAt,
    updatedAt,
    slug,
    name,
    socialMedia,
    inctPosition,
    researchProjects,
    memberOf,
    description,
    email,
    image,
    lattesUrl,
    pronouns,
    inctGroup,
    body,
    orcidUrl,
    id
  } = doc;
  return (
    <div className="py-12 md:px-8 lg:px-12 xl:px-16">
      <Link
        href={'/equipe'}
        className="text-primary mb-4!  flex items-center gap-2"
      >
        <ArrowLeft className="size-4" />
        Lista de pessoas
      </Link>
      <div className="flex flex-wrap">
        <article className="profile basis-full lg:basis-3/4 p-4">
          <div className="bg-stone-200 h-20 w-full rounded-xs"></div>
          <div className="flex flex-col gap-4 justify-center items-center mb-5 -mt-16 text-center">
            <div className="relative size-30 rounded-full overflow-hidden shadow-lg border-4 border-white">
              {image! && typeof image !== 'string' && image.url && (
                <img
                  src={image?.url}
                  alt=""
                  className="w-full h-full object-center object-cover m-0! saturate-0"
                />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-balance">
                {name}
              </h1>
              <div className="flex gap-2 flex-wrap mb-5 justify-center">
                {inctPosition.map((position) => {
                  position = position as DefinedTerm;
                  return (
                    <div
                      key={position.id}
                      className="items-center justify-center rounded-md px-2 py-0.5 text-sm md:text-base font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring overflow-hidden bg-trinidad text-white border border-transparent"
                    >
                      {position.name} no INCT Antirracismo
                    </div>
                  );
                })}
                {inctGroup!.map((group) => {
                  group = group as DefinedTerm;
                  return (
                    <div
                      key={group.id}
                      className="items-center justify-center rounded-md px-2 py-0.5 text-sm md:text-base font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring overflow-hidden text-trinidad border border-trinidad"
                    >
                      Núcleo: {group.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="max-w-prose mx-auto text-center text-lg lg:text-xl text-balance mb-5">
            {description}
          </p>
          <hr />
          <div className="max-h-56 relative overflow-hidden">
            <div className="absolute w-full py-2 bottom-0 left-0 z-3">
              <div className="max-w-prose mx-auto ">
                <Button variant={'secondary'} className="w-full">
                  Leia mais
                </Button>
              </div>
            </div>
            <div className="absolute w-full h-5/6 bg-linear-to-t from-white/90  via-35% via-white/80 to-transparent bottom-0 left-0 z-2"></div>
            <div className="prose mx-auto">
              {/* <p className="text-xs!">{JSON.stringify(body)}</p> */}
              <div className="prose">
                <CustomRichText lexicalData={body as any} />
              </div>
            </div>
          </div>
        </article>
        <div className="basis-1/4 border h-36"></div>
      </div>
    </div>
  );
}
