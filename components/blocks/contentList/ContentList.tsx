'use client';

import {
  applyPronounsToDefinedTerm,
  buildListSentence,
  cn,
  createDynamicContentURL
} from '@/lib/utils';
import { DefinedTerm, Organization, Person } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import ContentCarousel from './ContentCarousel';
import Buttons from '../Buttons';
import PersonCard from '../PersonCard';

export type ContentListProps = { block: any; collectionSlug: string };

export default function ContentList({
  block,
  collectionSlug
}: ContentListProps) {
  return (
    <div className="container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid">
      {/* Isso é o que vem antes da lists */}
      {block.name || block.description || block.buttons!.length > 0 ? (
        <div className="mb-8 mt-12 border-b pb-3">
          {block.name ? (
            <h2 className="text-balance font-bold text-2xl mb-1">
              {block.name}
            </h2>
          ) : null}

          {block.description ? (
            <p className="text-balance text-muted-foreground mb-3">
              {block.description}
            </p>
          ) : null}
          {block.buttons!.length > 0 && (
            <div className=" mb-3 mt-2">
              <Buttons buttons={block.buttons} />
            </div>
          )}
        </div>
      ) : null}

      {/* Lista */}
      {block.items?.length > 0 ? (
        <div
          className={cn(
            'grid xl:grid-cols-2 gap-x-8 gap-y-12 items-center',
            block.items.length === 1 && 'xl:grid-cols-1'
          )}
        >
          {block.items
            .map((i: any) => i.value)
            .map((doc: Person) => {
              if (collectionSlug === 'persons')
                return <PersonCard key={doc.id + '_person'} person={doc} />;
            })}
        </div>
      ) : null}
    </div>
  );
}
