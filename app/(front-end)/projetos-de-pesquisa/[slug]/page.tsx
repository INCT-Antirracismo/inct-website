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
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export type ResearchProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: ResearchProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getDocBySlug(
    'researchProjects',
    slug
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
  const { slug } = await params;
  const doc = (await getDocBySlug(
    'researchProjects',
    slug
  )) as ResearchProject | null;
  if (!doc) return <NotFound collectionSlug="researchProjects" />;
  const { id, name, description, relations, members, additionalMembers, url } =
    doc;

  return (
    <div className="container py-12 mx-auto">
      <Link href="/projetos-de-pesquisa">
        <h2
          id="projetos-de-pesquisa"
          className="uppercase text-xs md:text-sm tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance"
        >
          Projetos de Pesquisa
        </h2>
      </Link>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 lg:mb-4 text-balance lg:max-w-5/6">
        {name}
      </h1>

      {/* DESCRIÇÃO */}
      <p className="text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
        {description}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 items-center">
        {url ? (
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
        ) : null}
      </div>
      <ul className="my-8 py-8 border-y flex flex-wrap gap-6 items-center">
        {relations?.map((relation) => {
          const organization = relation.relationTo.value as Organization;
          return (
            <li key={relation.id}>
              <p className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
                {buildListSentence(
                  relation.relationType.map((relation) => {
                    return applyPronounsToDefinedTerm(
                      'Neutro',
                      relation as DefinedTerm
                    );
                  })
                ).toLowerCase()}
              </p>
              <h3 className="font-normal md:text-lg max-w-xs text-balance mb-2">
                {organization.acronym || organization.name}
              </h3>
            </li>
          );
        })}
      </ul>
      <p className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
        Membros
      </p>
      <h3 className="font-normal md:text-lg max-w-prose text-balance mb-2">
        {additionalMembers}
      </h3>
      <div className="grid items-center gap-2 mt-5 border-b pb-6">
        <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
          Pessoas deste INCT que participam
        </p>
        <FacePile members={doc.members?.docs as any} />
      </div>

      <div className=" my-8">
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </div>
  );
}
