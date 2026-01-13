import { getPayload } from 'payload';
import config from '@payload-config';
import { Person } from '@/payload-types';
import Link from 'next/link';
import { createDynamicContentURL } from '@/lib/utils';

const payload = await getPayload({ config });
export type PersonsPageProps = {};

export default async function PersonsPage(props: PersonsPageProps) {
  const data = await payload.find({
    collection: 'persons'
  });
  if (!data) return null;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>Lista de pessoas</h1>
      {data.docs.map((doc: Person) => {
        return (
          <div key={doc.id + '_person'}>
            <Link href={createDynamicContentURL(doc, 'persons')}>
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
