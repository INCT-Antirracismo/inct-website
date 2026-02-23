import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Publication } from '@/payload-types';
import { TrafficCone } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export type PublicationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return { title: 'INCT Antirracismo' };
  return {
    title: `${doc.name} - INCT Antirracismo`,
    description: doc.description
  };
}

export default async function PublicationPage({
  params
}: PublicationPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return <NotFound collectionSlug="publications" />;
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
    </div>
  );
}
