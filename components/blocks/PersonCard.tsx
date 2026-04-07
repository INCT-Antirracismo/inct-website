'use client';

import { applyPronounsToDefinedTerm, buildListSentence } from '@/lib/utils';
import { DynamicContentLink } from '@/lib/utils/DynamicContentLink';
import { DefinedTerm, Organization, Person } from '@/payload-types';

export type PersonCardProps = { person: Person };

export default function PersonCard({ person: doc }: PersonCardProps) {
  const { slug, image, pronouns, inctGroup, memberOf } = doc;
  return (
    <DynamicContentLink
      slug={slug}
      collection="persons"
      className="flex  sm:items-center gap-6 group"
    >
      <div className="relative w-30 h-36 sm:w-36 aspect-square  overflow-hidden rounded border shrink-0">
        {image! && typeof image !== 'string' && image.url && (
          <img
            loading="lazy"
            src={image?.thumbnailURL || image?.url}
            alt={image?.alt}
            className="w-full h-full object-center object-cover m-0! duration-300 ease-in-out group-hover:scale-102"
          />
        )}
      </div>
      <div className="w-full max-w-prose">
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
                  (organization.relationTo.value as Organization).acronym ||
                  (organization.relationTo.value as Organization).name
                }`;
              })
              .join(' | ')}
        </p>
        <h3 className="font-semibold text-lg lg:text-xl group-hover:underline underline-offset-2 decoration-2 decoration-trinidad">
          {doc.name}{' '}
        </h3>
        {inctGroup!.length > 0 && (
          <p className="text-balance tracking-wide">
            Núcleo: {inctGroup!.map((group) => (group as DefinedTerm).name)}
          </p>
        )}

        {/* {(inctPosition[0] as DefinedTerm)?.name !== 'Nenhum' &&
            inctPosition.filter(
              (pos) => (pos as DefinedTerm).name !== 'Pesquisa'
            ).length > 0 && (
              <p className="text-xs font-medium text-deep-sea-green my-2">
                {buildListSentence(
                  inctPosition
                    .filter((pos) => (pos as DefinedTerm).name !== 'Pesquisa')
                    .map((position) => {
                      return applyPronounsToDefinedTerm(
                        pronouns,
                        position as DefinedTerm
                      );
                    })
                )}{' '}
                no INCT Antirracismo
              </p>
            )} */}
        <p className="text-sm text-muted-foreground max-w-prose mt-3 text-balance">
          {doc.description!.slice(0, 160)}
          {doc.description!.length > 160 && '...'}
        </p>
      </div>
    </DynamicContentLink>
  );
}
