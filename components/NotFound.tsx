'use client';

import { CollectionSlug } from 'payload';

export type NotFoundProps = {
  collectionSlug?: CollectionSlug;
};

export default function NotFound({ collectionSlug }: NotFoundProps) {
  return (
    <div className="container mx-auto py-12 prose">
      Que pena, não encontramos o conteúdo que você buscou.
    </div>
  );
}
