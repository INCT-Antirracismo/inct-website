import { createDynamicContentURL } from '@/lib/utils';
import { Event } from '@/payload-types';
import config from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';

const payload = await getPayload({ config });
export type EventsPageProps = {};

export default async function EventsPage(props: EventsPageProps) {
  const data = await payload.find({
    collection: 'events'
  });
  if (!data) return null;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>Lista de Eventos</h1>
      {data.docs.map((doc: Event) => {
        return (
          <div key={doc.id + '_event'}>
            <Link href={createDynamicContentURL(doc, 'events')}>
              <h3>{doc.name}</h3>
            </Link>
            <p>{doc.description}</p>
          </div>
        );
      })}
      <Link href={'/'}>Página Inicial</Link>
    </div>
  );
}
