'use client';

import { stringify } from 'qs-esm';
import {
  DefinedTerm,
  Media,
  Organization,
  Person,
  Publication,
  ResearchProject
} from '@/payload-types';
import { CollectionSlug, Where } from 'payload';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createDynamicContentURL } from '@/lib/utils';
import { find } from 'lodash';

export type PersonsListProps = {
  docs: (number | Person)[] | undefined;
  collectionSlug: CollectionSlug;
  researchProjectID: number | string;
};

export default function PersonsList({
  docs,
  collectionSlug,
  researchProjectID
}: PersonsListProps) {
  if (!docs || docs.length < 1) return null;
  const [data, setData] = useState<Person[]>();
  useEffect(() => {
    if (isNaN(docs[0] as number)) {
      setData(docs as Person[]);
    } else {
      fetchData();
    }
  }, [docs]);

  const fetchData = async () => {
    const query: Where = {
      id: {
        in: docs.join(',')
      }
    };

    const stringifiedQuery = stringify(
      {
        where: query
      },
      { addQueryPrefix: true }
    );

    await fetch(`/api/${collectionSlug}${stringifiedQuery}`)
      .then((res) => res.json())
      .then((res) => setData(res.docs));
  };

  return (
    <div>
      <div className="prose">
        <h3>Membros do projeto de pesquisa</h3>
      </div>
      {data?.map((doc) => {
        // @ts-ignore
        const image: Media | false =
          doc.image === undefined ? false : doc.image;
        return (
          <Link
            key={doc.slug}
            href={createDynamicContentURL(doc, collectionSlug)}
            className="group"
          >
            <div key={`${doc.id}`} className="flex gap-4 my-4 items-center">
              {image !== false && (
                <div className="rounded-full border-4 border-primary relative overflow-hidden w-14 aspect-square shrink-0">
                  <img
                    src={image.thumbnailURL as string}
                    alt=""
                    className="w-full h-full object-cover object-center m-0!"
                  />
                </div>
              )}
              <div className="">
                <p className="text-[10px] uppercase tracking-wider text-primary font-medium">
                  {find(doc.memberOf, function (o) {
                    return (
                      (o.researchProject.value as ResearchProject).id ===
                      researchProjectID
                    );
                  })
                    ?.relationType.map((r) => (r as DefinedTerm).name)
                    .join(', ')}
                </p>
                <p className="group-hover:underline font-semibold text-lg">
                  {doc.name}
                </p>
                {/* <p className="text-muted-foreground max-w-prose text-sm">
                  {doc.description}
                </p> */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
