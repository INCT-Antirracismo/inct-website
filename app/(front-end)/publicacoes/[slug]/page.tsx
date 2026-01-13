import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Publication } from '@/payload-types';
import Link from 'next/link';

export type PublicationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicationPage({
  params
}: PublicationPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('publications', slug)) as Publication | null;
  if (!doc) return <NotFound collectionSlug="publications" />;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>{doc.name}</h1>
      <p className="lead">{doc.description}</p>
      <Link href={'/publicacoes'}>Lista de publicações</Link>
    </div>
  );
}
