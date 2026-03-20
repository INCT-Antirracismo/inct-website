'use server';

import { CollectionSlug, getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });
export async function getDocBySlug(
  collectionSlug: CollectionSlug,
  slug: string
) {
  const data = await payload.find({
    collection: collectionSlug,
    where: { slug: { equals: slug } },
    depth: 2,
    pagination: false,
    limit: 1
  });
  if (!(data.docs.length > 0)) return null;
  return data.docs[0];
}

export async function getDocumentById(
  collectionSlug: CollectionSlug,
  id: string,
  args: any = {}
) {
  const doc = await payload.findByID({
    collection: collectionSlug,
    id,
    ...args
  });
  if (!doc) return null;
  return doc;
}

export async function getRelations() {
  const docs = await payload.find({
    collection: 'definedTerms',
    where: {
      additionalType: { equals: 'occupation' }
    },
    limit: 99
  });
  return docs;
}
