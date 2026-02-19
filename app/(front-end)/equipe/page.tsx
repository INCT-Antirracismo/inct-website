import { getPayload } from 'payload';
import config from '@payload-config';
import { DefinedTerm, Organization, Person } from '@/payload-types';
import Link from 'next/link';
import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  createDynamicContentURL
} from '@/lib/utils';
import Image from 'next/image';

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
      <div className="grid lg:grid-cols-2 gap-x-8 gap-y-16 items-center">
        {data.docs.map((doc: Person) => {
          const { image, inctPosition, pronouns, inctGroup, memberOf } = doc;
          return (
            <Link
              key={doc.id + '_person'}
              className="flex flex-col sm:flex-row items-center gap-6 group text-center sm:text-left"
              href={createDynamicContentURL(doc.slug, 'persons')}
            >
              <div className="relative w-36 aspect-square lg:aspect-3/4 overflow-hidden rounded-xl shadow-lg border shrink-0">
                {image! && typeof image !== 'string' && image.url && (
                  <Image
                    width={300}
                    height={400}
                    loading="lazy"
                    src={image?.thumbnailURL || image?.url}
                    alt={image?.alt}
                    className="w-full h-full object-center object-cover m-0! saturate-0 contrast-125 group-hover:saturate-100 duration-300 ease-in-out group-hover:scale-102"
                  />
                )}
              </div>
              <div className="w-full max-w-lg">
                <p className="text-xs font-medium tracking-wider text-trinidad uppercase mb-1 sm:mb-1.5">
                  {memberOf!.length > 0 &&
                    memberOf
                      ?.map((organization) => {
                        let occupations = `${buildListSentence(
                          organization.relationType.map((relation) => {
                            return applyPronounsToDefinedTerm(
                              pronouns,
                              relation as DefinedTerm
                            );
                          })
                        )}`;
                        return `${
                          (organization.relationTo.value as Organization)
                            .acronym ||
                          (organization.relationTo.value as Organization).name
                        }`;
                      })
                      .join(' | ')}
                </p>
                <h3 className="font-bold text-lg lg:text-xl group-hover:underline">
                  {doc.name}{' '}
                </h3>
                <p className="text-sm text-balance">
                  {inctGroup!.map((group) => (group as DefinedTerm).name)}
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
                <p className="text-sm text-muted-foreground max-w-prose mt-3 text-balance">
                  {doc.description!.slice(0, 160)}
                  {doc.description!.length > 160 && '...'}
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
