import CollapsibleBodyContent from '@/components/CollapsibleBodyContent';
import FacePile from '@/components/Facepile';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { Button } from '@/components/ui/button';
import { getDocBySlug } from '@/lib/local-api';
import { applyPronounsToDefinedTerm, buildListSentence } from '@/lib/utils';
import {
  DefinedTerm,
  Organization,
  Person,
  ResearchProject
} from '@/payload-types';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export type ResearchProjectPageProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export async function generateMetadata({
  params
}: ResearchProjectPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug(
    'researchProjects',
    slug,
    lang
  )) as ResearchProject | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

export default async function ResearchProjectPage({
  params
}: ResearchProjectPageProps) {
  const { slug, lang } = await params;
  const doc = (await getDocBySlug(
    'researchProjects',
    slug,
    lang
  )) as ResearchProject | null;
  if (!doc) return <NotFound collectionSlug="researchProjects" />;
  const { id, name, description, relations, members, additionalMembers, url } =
    doc;

  return (
    <main className="container py-8 md:py-16 mx-auto max-w-4xl">
      <header>
        <Link href="/projetos-de-pesquisa">
          <h2
            id="projetos-de-pesquisa"
            className="uppercase text-xs md:text-sm tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Projetos de Pesquisa
          </h2>
        </Link>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-8 text-pretty lg:max-w-5/6 leading-tight">
          {name}
        </h1>

        {/* DESCRIÇÃO */}
        <section className="my-5 md:my-8 pt-5 md:pt-8 border-t">
          <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
            Resumo
          </h2>
          <p className="text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
            {description}
          </p>
        </section>

        {url ? (
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              variant={'secondary'}
              className="hover:bg-white text-primary uppercase font-medium tracking-wide text-xs flex items-center"
              size="sm"
              asChild
            >
              <Link href={url} target="_blank">
                Site <ExternalLink />
              </Link>
            </Button>
          </div>
        ) : null}
      </header>
      <section className="my-5 md:my-8 pt-5 md:pt-8 border-t">
        <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
          Membros
        </h2>
        <p className="font-normal md:text-lg max-w-prose text-balance mb-8">
          {additionalMembers}
        </p>
        <div className="grid items-center gap-2">
          <h3 className="text-[10px] tracking-widest text-muted-foreground uppercase">
            Pessoas deste INCT que participam
          </h3>
          <FacePile members={doc.members?.docs as any} />
        </div>
      </section>

      <section className="my-5 md:my-8 py-5 md:py-8 border-y">
        <ul className="flex flex-wrap gap-6 items-center">
          {relations?.map((relation) => {
            const organization = relation.relationTo.value as Organization;
            return (
              <li key={relation.id}>
                <h3 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
                  {buildListSentence(
                    relation.relationType.map((relation) => {
                      return applyPronounsToDefinedTerm(
                        'Neutro',
                        relation as DefinedTerm
                      );
                    })
                  ).toLowerCase()}
                </h3>
                <h4 className="font-normal md:text-lg max-w-xs text-balance mb-2">
                  {organization.acronym || organization.name}
                </h4>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="my-10 md:my-16">
        <h2 className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
          Sobre
        </h2>
        <CollapsibleBodyContent body={doc.body} />
      </section>
    </main>
  );
}
