import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Person } from '@/payload-types';
import Link from 'next/link';

export type PersonPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('persons', slug)) as Person | null;
  if (!doc) return <NotFound collectionSlug="persons" />;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>{doc.name}</h1>
      <p className="lead">{doc.description}</p>
      <Link href={'/equipe'}>Lista de pessoas</Link>
    </div>
  );
}
