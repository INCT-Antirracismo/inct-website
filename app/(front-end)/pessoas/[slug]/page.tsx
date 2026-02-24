import CollapsibleBodyContent from '@/components/CollapsibleBodyContent';
import NotFound from '@/components/NotFound';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  createDynamicContentURL
} from '@/lib/utils';
import {
  DefinedTerm,
  Organization,
  Person,
  Publication,
  ResearchProject
} from '@/payload-types';
import { find } from 'lodash';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLinkIcon,
  Pointer
} from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export type PersonPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: PersonPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getDocBySlug('persons', slug)) as Person | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

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
    publications,
    id
  } = doc;
  return (
    <div className="flex">
      <aside className="hidden md:block max-w-xs px-4 border-r">
        <div className="flex flex-col gap-2 mb-5 mt-8">
          {researchProjects!.length > 0 && (
            <a href="#projetos-de-pesquisa">
              <Button variant={'ghost'}>
                <ChevronRight /> Projetos de pesquisa
              </Button>
            </a>
          )}
          {publications!.docs!.length > 0 && (
            <a href="#publicacoes">
              <Button variant={'ghost'}>
                <ChevronRight /> Publicações
              </Button>
            </a>
          )}
        </div>
      </aside>
      <article className="container px-4 mb-16">
        <div className="flex sm:items-center gap-6 my-8">
          <div className="relative sm:w-1/5 max-w-56 aspect-3/4 overflow-hidden rounded-xl border shrink-0">
            {image! && typeof image !== 'string' && image.url && (
              <Image
                width={300}
                height={400}
                loading="lazy"
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-center object-cover m-0! duration-300 ease-in-out group-hover:scale-102"
              />
            )}
          </div>
          <div className="w-full">
            <p className="text-balance tracking-wide font-medium text-deep-sea-green">
              Núcleo: {inctGroup!.map((group) => (group as DefinedTerm).name)}
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold lg:mb-1 text-balance">
              {name}
            </h1>
            {(inctPosition[0] as DefinedTerm)?.name !== 'Nenhum' ||
            inctGroup!.length > 0 ? (
              <>
                <p className="md:text-lg lg:text-xl mb-3 text-brown">
                  {(inctPosition[0] as DefinedTerm)?.name !== 'Nenhum' &&
                    buildListSentence(
                      inctPosition.map((position) => {
                        return applyPronounsToDefinedTerm(
                          pronouns,
                          position as DefinedTerm
                        );
                      })
                    )}{' '}
                  no INCT Antirracismo.
                </p>
                {memberOf!.length > 0 &&
                  memberOf?.map((organization) => (
                    <p className="text-sm md:text-base font-medium tracking-wider md:tracking-normal text-trinidad">
                      {`${buildListSentence(
                        organization.relationType.map((relation) => {
                          return applyPronounsToDefinedTerm(
                            pronouns,
                            relation as DefinedTerm
                          );
                        })
                      )} - ${
                        (organization.relationTo.value as Organization)
                          .acronym ||
                        (organization.relationTo.value as Organization).name
                      }`}
                    </p>
                  ))}

                {/* {inctGroup!.length > 0 && (
                      <p className="text-xs uppercase text-muted-foreground tracking-wide">
                        {inctGroup!.length === 1 ? 'Núcleo' : 'Núcleos'}:{' '}
                        {buildListSentence(
                          inctGroup!.map((group) => {
                            return applyPronounsToDefinedTerm(
                              pronouns,
                              group as DefinedTerm
                            );
                          })
                        )}
                      </p>
                    )} */}

                {/* {inctGroup!.map((group) => {
                      group = group as DefinedTerm;
                      return (
                        <div
                          key={group.id}
                          className="items-center justify-center rounded-md px-2 py-0.5 text-sm md:text-base font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring overflow-hidden bg-background text-foreground border"
                        >
                          Núcleo: {group.name}
                        </div>
                      );
                    })} */}
              </>
            ) : null}
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <p className="text-brown text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
          {description}
        </p>

        {/* LATTES E ORCID */}
        <div className="mt-3 flex flex-wrap gap-3 items-center">
          {lattesUrl ? (
            <Button
              variant={'ghost'}
              className="hover:bg-white text-primary uppercase font-medium tracking-wide text-xs flex items-center"
              size="sm"
              asChild
            >
              <Link href={lattesUrl} target="_blank">
                Currículo Lattes
              </Link>
            </Button>
          ) : null}
          {orcidUrl ? (
            <Button
              variant={'ghost'}
              className="hover:bg-white text-primary uppercase font-medium tracking-wide text-xs flex items-center"
              size="sm"
              asChild
            >
              <Link href={orcidUrl} target="_blank">
                Orcid
              </Link>
            </Button>
          ) : null}
          {socialMedia!.length > 0 &&
            socialMedia?.map((media) => {
              return (
                <Button
                  key={media.id}
                  variant={'ghost'}
                  className="hover:bg-white text-primary uppercase font-medium tracking-wide text-xs flex items-center"
                  size="sm"
                  asChild
                >
                  <Link href={media.url || ''} target="_blank">
                    {media.type}
                  </Link>
                </Button>
              );
            })}
        </div>

        <hr className="max-w-sm my-5 mb-8 lg:mb-12" />
        {/* SOBRE */}
        <CollapsibleBodyContent body={body} />

        {/* Projetos */}
        {researchProjects!.length > 0 && (
          <section className="my-16">
            <h2
              id="projetos-de-pesquisa"
              className="uppercase text-sm tracking-widest text-trinidad font-medium mb-5"
            >
              Projetos de Pesquisa
            </h2>
            <ul>
              {researchProjects?.map((researchProject) => {
                const project = researchProject.relationTo
                  .value as ResearchProject;
                return (
                  <li key={researchProject.id}>
                    <p className="mb-1 font-medium text-deep-sea-green">
                      É{' '}
                      {buildListSentence(
                        researchProject.relationType.map((relation) => {
                          return applyPronounsToDefinedTerm(
                            pronouns,
                            relation as DefinedTerm
                          );
                        })
                      ).toLowerCase()}{' '}
                      em
                    </p>
                    <Link
                      href={createDynamicContentURL(
                        project.slug,
                        'researchProjects'
                      )}
                      className="group"
                    >
                      <h3 className="font-bold text-2xl max-w-prose text-balance mb-2 decoration-trinidad underline-offset-2 decoration-2 group-hover:underline cursor-pointer">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground max-w-prose text-pretty">
                        {project.description}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {/* Publicações */}
        {publications!.docs!.length > 0 && (
          <section className="my-16">
            <h2
              id="publicacoes"
              className="uppercase text-sm tracking-widest text-trinidad font-medium mb-5"
            >
              Publicações
            </h2>
            <ul>
              {publications!.docs?.map((publication) => {
                publication = publication as Publication;
                return (
                  <li key={publication.id}>
                    <Link
                      href={createDynamicContentURL(
                        publication.slug,
                        'publications'
                      )}
                      className="group"
                    >
                      <h3 className="font-bold text-2xl max-w-prose text-balance mb-2 decoration-trinidad underline-offset-2 decoration-2 group-hover:underline cursor-pointer">
                        {publication.name}
                      </h3>
                      <p className="text-muted-foreground max-w-prose text-pretty">
                        {publication.description}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
