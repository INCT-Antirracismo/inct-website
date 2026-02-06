import { getPayload } from 'payload';
import config from '@payload-config';
import { DefinedTerm, Organization, Person } from '@/payload-types';
import Link from 'next/link';
import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  createDynamicContentURL
} from '@/lib/utils';

const payload = await getPayload({ config });
export type PersonsPageProps = {};

export default async function PersonsPage(props: PersonsPageProps) {
  const data = await payload.find({
    collection: 'persons',
    limit: 100,
    sort: 'name'
  });
  if (!data) return null;
  return (
    <div className="container mx-auto py-12">
      <h1>Lista de pessoas</h1>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {data.docs.map((doc: Person) => {
          const { image, inctPosition, pronouns, inctGroup, memberOf } = doc;
          return (
            <Link
              key={doc.id + '_person'}
              className="flex items-center gap-6 group"
              href={createDynamicContentURL(doc, 'persons')}
            >
              <div className="relative w-36 aspect-3/4 overflow-hidden rounded-xl shadow-xl border-2 border-white shrink-0">
                {image! && typeof image !== 'string' && image.url && (
                  <img
                    src={image?.url}
                    alt={image?.alt}
                    className="w-full h-full object-center object-cover m-0! saturate-0 contrast-125 group-hover:saturate-100 duration-300 ease-in-out group-hover:scale-105 "
                  />
                )}
              </div>
              <div className="w-full max-w-lg">
                <div className="flex justify-between text-xs font-medium tracking-wider text-trinidad uppercase mb-2">
                  <p className="text-right">
                    {inctGroup!.map((group) => (group as DefinedTerm).name)}
                  </p>
                </div>
                <h3 className="font-bold  text-lg">{doc.name} </h3>
                <p className="text-sm">
                  {memberOf!.length > 0 &&
                    memberOf
                      ?.map((organization) => {
                        return `${buildListSentence(
                          organization.relationType.map((relation) => {
                            return applyPronounsToDefinedTerm(
                              pronouns,
                              relation as DefinedTerm
                            );
                          })
                        )} - ${
                          (organization.relationTo.value as Organization)
                            .acronym ||
                          (organization.relationTo.value as Organization).name
                        }`;
                      })
                      .join(' | ')}
                </p>
                {(inctPosition[0] as DefinedTerm)?.name !== 'Nenhum' &&
                  inctPosition.filter(
                    (pos) => (pos as DefinedTerm).name !== 'Pesquisa'
                  ).length > 0 && (
                    <p className="text-xs font-medium text-deep-sea-green my-2">
                      {buildListSentence(
                        inctPosition
                          .filter(
                            (pos) => (pos as DefinedTerm).name !== 'Pesquisa'
                          )
                          .map((position) => {
                            return applyPronounsToDefinedTerm(
                              pronouns,
                              position as DefinedTerm
                            );
                          })
                      )}{' '}
                      no INCT Antirracismo
                    </p>
                  )}
                <p className="text-sm text-muted-foreground max-w-prose mt-3">
                  {doc.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href={'/sitemap'}>Página Inicial</Link>
    </div>
  );
}
