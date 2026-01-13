import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import PersonsList from '@/components/PersonsList';
import { getDocBySlug } from '@/lib/local-api';
import { ResearchProject } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export type ResearchProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ResearchProjectPage({
  params
}: ResearchProjectPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug(
    'researchProjects',
    slug
  )) as ResearchProject | null;
  if (!doc) return <NotFound collectionSlug="researchProjects" />;
  return (
    <>
      <div className="container pt-12 mb-8">
        <Link
          href={'/projetos-de-pesquisa'}
          className="text-primary mb-4!  flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Lista de projetos de pesquisa
        </Link>
        <h1 className="text-6xl font-black mb-8">{doc.name}</h1>
        <p className="text-3xl">{doc.description}</p>
      </div>

      <div className="container m-8">
        <PersonsList
          docs={doc.members?.docs}
          collectionSlug="persons"
          researchProjectID={doc.id}
        />
      </div>
      <div className="container my-8 prose">
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </>
  );
}
