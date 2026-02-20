'use client';

import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  createDynamicContentURL
} from '@/lib/utils';
import { DefinedTerm, Organization, Person } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import ContentCarousel from './ContentCarousel';
import Buttons from '../Buttons';

export type ContentListProps = { block: any; collectionSlug: string };

export default function ContentList({
  block,
  collectionSlug
}: ContentListProps) {
  if (collectionSlug === 'persons')
    return (
      <div className="container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid justify-center">
        {/* Isso é o que vem antes da lists */}
        {block.name || block.description || block.buttons!.length > 0 ? (
          <div className="mb-8 mt-12 border-b pb-3 text-center sm:text-left">
            {block.name ? (
              <h2 className="font-bold text-xl lg:text-2xl mb-1">
                {block.name}
              </h2>
            ) : null}

            {block.description ? (
              <p className="text-sm lg:text-base text-muted-foreground mb-3">
                {block.description}
              </p>
            ) : null}
            {block.buttons!.length > 0 && (
              <div className=" mb-3 mt-1">
                <Buttons buttons={block.buttons} />
              </div>
            )}
          </div>
        ) : null}

        {/* Lista */}
        {block.items?.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-x-8 gap-y-16 items-center">
            {block.items
              .map((i: any) => i.value)
              .map((doc: Person) => {
                const { image, inctPosition, pronouns, inctGroup, memberOf } =
                  doc;

                return (
                  <Link
                    key={doc.id + '_person'}
                    className="flex flex-col sm:flex-row items-center gap-6 group text-center sm:text-left"
                    href={createDynamicContentURL(doc.slug, collectionSlug)}
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
                                (organization.relationTo.value as Organization)
                                  .name
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
                  </Link>
                );
              })}
          </div>
        ) : null}
      </div>
    );
}
