import CollapsibleBodyContent from '@/components/CollapsibleBodyContent';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  cn,
  createDynamicContentURL
} from '@/lib/utils';
import {
  DefinedTerm,
  Organization,
  Person,
  Publication,
  ResearchProject
} from '@/payload-types';
import { ArrowLeft, ExternalLinkIcon, LinkIcon } from 'lucide-react';
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
    publications,
    id
  } = doc;
  return (
    <div className="">
      <main className="flex flex-wrap justify-center">
        <article className="profile basis-full lg:basis-3/4 p-4">
          <header className="pb-5">
            <nav
              aria-label="Voltar para lista"
              className="bg-deep-sea-green h-20 w-full rounded-xs text-white p-3"
            >
              <Link href={'/equipe'} className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                Lista de pessoas
              </Link>
            </nav>
            <div className="flex flex-col gap-4 justify-center items-center mb-5 -mt-16 text-center">
              <div className="relative size-30 rounded-full overflow-hidden shadow-lg border-4 border-sun">
                {image! && typeof image !== 'string' && image.url && (
                  <img
                    src={image?.url}
                    alt={image?.alt}
                    className="w-full h-full object-center object-cover m-0! saturate-0"
                  />
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-6xl font-black mb-3 text-balance">
                  {name}
                </h1>
                <div className="w-full flex justify-between"></div>
                {(inctPosition[0] as DefinedTerm)?.name !== 'Nenhum' ||
                inctGroup!.length > 0 ? (
                  <div className="grid gap-3">
                    <p className="text-lg text-stone-700">
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
                    <p className="text-sm text-muted-foreground">
                      {memberOf!.length > 0 &&
                        memberOf
                          ?.map((organization) => {
                            return `${buildListSentence(
                              organization.relationType.map((relation) => {
                                return applyPronounsToDefinedTerm(
                                  pronouns,
                                  relation as DefinedTerm
                                );
                              })
                            )} - ${
                              (organization.relationTo.value as Organization)
                                .acronym ||
                              (organization.relationTo.value as Organization)
                                .name
                            }`;
                          })
                          .join(' | ')}
                    </p>

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
                  </div>
                ) : null}
              </div>
            </div>

            {/* DESCRIÇÃO */}
            <p className="mx-auto text-center text-lg lg:text-2xl text-balance max-w-prose">
              {description}
            </p>
            <div className="flex items-center justify-center gap-2 my-5">
              <a href="#projetos-de-pesquisa">
                <Button>Projetos de pesquisa</Button>
              </a>
              <a href="#publicacoes">
                <Button>Publicações</Button>
              </a>
            </div>

            {/* LATTES E ORCID */}
            <div className="mt-5 flex flex-wrap items-center justify-center">
              {lattesUrl ? (
                <Button
                  variant={'link'}
                  className="text-primary uppercase font-medium tracking-wide text-xs flex items-center"
                  size="sm"
                  asChild
                >
                  <Link href={lattesUrl} target="_blank">
                    Currículo Lattes
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                </Button>
              ) : null}
              {orcidUrl ? (
                <Button
                  variant={'link'}
                  className="text-primary uppercase font-medium tracking-wide text-xs flex items-center"
                  size="sm"
                  asChild
                >
                  <Link href={orcidUrl} target="_blank">
                    Orcid
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                </Button>
              ) : null}
              {socialMedia!.length > 0 &&
                socialMedia?.map((media) => {
                  return (
                    <Button
                      key={media.id}
                      variant={'link'}
                      className="text-primary uppercase font-medium tracking-wide text-xs flex items-center"
                      size="sm"
                      asChild
                    >
                      <Link href={media.url || ''} target="_blank">
                        {media.type}
                        <ExternalLinkIcon className="size-3" />
                      </Link>
                    </Button>
                  );
                })}
            </div>
          </header>
          <hr className="mx-auto max-w-sm my-5" />
          {/* SOBRE */}
          <CollapsibleBodyContent body={body} />

          <section className="my-16 container mx-auto">
            <h2
              id="projetos-de-pesquisa"
              className="uppercase text-sm tracking-wide text-muted-foreground mb-5"
            >
              Projetos de Pesquisa
            </h2>
            <ul>
              {researchProjects!.length > 0 &&
                researchProjects?.map((researchProject) => {
                  const project = researchProject.relationTo
                    .value as ResearchProject;
                  return (
                    <li key={researchProject.id} className="w-1/2">
                      <p className="mb-1">
                        {buildListSentence(
                          researchProject.relationType.map((relation) => {
                            return applyPronounsToDefinedTerm(
                              pronouns,
                              relation as DefinedTerm
                            );
                          })
                        )}
                      </p>
                      <Link
                        href={createDynamicContentURL(
                          project,
                          'researchProjects'
                        )}
                      >
                        <h3 className="font-black text-2xl max-w-prose text-pretty mb-2 hover:underline cursor-pointer">
                          {project.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground max-w-prose text-balance">
                        {project.description}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </section>
          <section className="my-16 container mx-auto">
            <h2
              id="publicacoes"
              className="uppercase text-sm tracking-wide text-muted-foreground mb-5"
            >
              Publicações
            </h2>
            <ul>
              {publications!.docs!.length > 0 &&
                publications!.docs?.map((publication) => {
                  publication = publication as Publication;
                  return (
                    <li key={publication.id}>
                      <h3 className="font-black text-xl uppercase max-w-prose text-balance">
                        {publication.name}
                      </h3>
                      <p className="text-muted-foreground max-w-prose text-pretty">
                        {publication.description}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </section>
        </article>
        {/* <div className="basis-1/4 border h-36"></div> */}
      </main>
    </div>
  );
}
