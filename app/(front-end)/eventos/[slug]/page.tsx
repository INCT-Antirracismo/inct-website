import NotFound from '@/components/NotFound';
import { getDocBySlug } from '@/lib/local-api';
import { Event } from '@/payload-types';
import Link from 'next/link';

export type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug('events', slug)) as Event | null;
  if (!doc) return <NotFound collectionSlug="events" />;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>{doc.name}</h1>
      <p className="lead">{doc.description}</p>
      <Link href={'/eventos'}>Lista de eventos</Link>
    </div>
  );
}
