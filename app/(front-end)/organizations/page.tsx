import { createDynamicContentURL } from '@/lib/utils';
import { Organization } from '@/payload-types';
import config from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';

const payload = await getPayload({ config });
export type OrganizationsPageProps = {};

export default async function OrganizationsPage(props: OrganizationsPageProps) {
  const data = await payload.find({
    collection: 'organizations'
  });
  if (!data) return null;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>Lista de organizações</h1>
      {data.docs.map((doc: Organization) => {
        return (
          <div key={doc.id + '_person'}>
            <Link href={createDynamicContentURL(doc, 'organizations')}>
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
