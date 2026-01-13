import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Organization } from '@/payload-types';
import Link from 'next/link';

export type OrganizationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OrganizationPage({
  params
}: OrganizationPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug(
    'organizations',
    slug
  )) as Organization | null;
  if (!doc) return <NotFound collectionSlug="organizations" />;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>{doc.name}</h1>
      <p className="lead">{doc.description}</p>
      <Link href={'/organizations'}>Lista de organizações</Link>
    </div>
  );
}
