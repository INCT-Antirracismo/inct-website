import ContentList from '@/components/blocks/contentList/ContentList';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import PersonsList from '@/components/PersonsList';
import { getDocBySlug } from '@/lib/local-api';
import { ResearchProject } from '@/payload-types';
import { ArrowLeft, TrafficCone } from 'lucide-react';
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
  const { name, description } = doc;
  return (
    <div className="container py-12">
      <div className="bg-sun-300 p-4 rounded-full mb-8 w-fit">
        <TrafficCone className="text-trinidad size-12 " />
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb:1 lg:mb-3 text-balance">
        {name}
      </h1>

      {/* DESCRIÇÃO */}
      <p className="text-brown text-lg lg:text-2xl text-balance leading-normal! max-w-prose">
        {description}
      </p>
      {/* <div className="my-8">
        <PersonsList
          docs={doc.members?.docs}
          collectionSlug="persons"
          researchProjectID={doc.id}
        />
        
      </div> */}
      <div className=" my-8">
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </div>
  );
}
