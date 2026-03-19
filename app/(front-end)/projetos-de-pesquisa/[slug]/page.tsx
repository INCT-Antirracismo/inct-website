import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { getDocBySlug, getRelations, getTermById } from '@/lib/local-api';
import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  createDynamicContentURL
} from '@/lib/utils';
import {
  DefinedTerm,
  Organization,
  Person,
  ResearchProject
} from '@/payload-types';
import { find, flatten, flattenDeep } from 'lodash';
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
  const { id, name, description, relations, members } = doc;
  const relationsDocs = await getRelations();
  return (
    <div className="container py-12 mx-auto">
      <h2
        id="projetos-de-pesquisa"
        className="uppercase text-sm md:text-base lg:text-base tracking-widest font-medium mb-2 text-trinidad max-w-prose text-balance"
      >
        Projeto de Pesquisa
      </h2>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 lg:mb-4 text-balance lg:max-w-5/6">
        {name}
      </h1>

      {/* DESCRIÇÃO */}
      <p className="text-brown text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
        {description}
      </p>
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
              <h3 className="font-bold text-xl max-w-xs text-balance mb-2">
                {organization.acronym || organization.name}
              </h3>
            </li>
          );
        })}
      </ul>
      <ul className="mb-8 pb-8 border-b flex flex-wrap gap-6 items-center">
        {members?.docs?.map((person) => {
          person = person as Person;
          const relation =
            person?.researchProjects
              ?.filter((r) =>
                typeof r.relationTo.value === 'string'
                  ? r.relationTo.value === id
                  : r.relationTo.value.id === id
              )
              .map((relation) => {
                return relation.relationType;
              })[0]
              .map((rel) => find(relationsDocs.docs, { id: rel })) || [];
          console.log(relation);
          return (
            <li key={person.id}>
              <p className="mb-1 font-medium text-deep-sea-green uppercase tracking-widest text-xs">
                {buildListSentence(
                  relation.map((rel) => {
                    return applyPronounsToDefinedTerm(
                      'Neutro',
                      rel as DefinedTerm
                    );
                  })
                ).toLowerCase()}
              </p>
              <Link
                href={createDynamicContentURL(person.slug, 'persons')}
                className="group"
              >
                <h3 className="font-bold text-xl max-w-xs text-balance mb-2">
                  {person.name}
                </h3>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className=" my-8">
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </div>
  );
}
