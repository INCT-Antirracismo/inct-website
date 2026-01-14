import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { getDocBySlug } from '@/lib/local-api';
import { Person } from '@/payload-types';
import { ArrowLeft } from 'lucide-react';
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
      <Link
        href={'/equipe'}
        className="text-primary mb-4!  flex items-center gap-2"
      >
        <ArrowLeft className="size-4" />
        Lista de pessoas
      </Link>
      <h1>{doc.name}</h1>
      <p className="lead">{doc.description}</p>
      <div className="my-8 prose">
        <p>
          <b>Sobre</b>
        </p>
        {/* <p className="text-xs!">{JSON.stringify(doc.body)}</p> */}
        <CustomRichText lexicalData={doc.body as any} />
      </div>
    </div>
  );
}
