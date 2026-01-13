import { createDynamicContentURL } from '@/lib/utils';
import { ResearchProject } from '@/payload-types';
import config from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';

const payload = await getPayload({ config });
export type ReasearchProjectsPageProps = {};

export default async function ReasearchProjectsPage(
  props: ReasearchProjectsPageProps
) {
  const data = await payload.find({
    collection: 'researchProjects'
  });
  if (!data) return null;
  return (
    <div className="container mx-auto py-12 prose">
      <h1>Lista de projetos de pesquisa</h1>
      {data.docs.map((doc: ResearchProject) => {
        return (
          <div key={doc.id + '_person'}>
            <Link href={createDynamicContentURL(doc, 'researchProjects')}>
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
