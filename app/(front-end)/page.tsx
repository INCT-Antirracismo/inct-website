import BlockRenderer from '@/components/blocks/BlockRenderer';
import DefaultCTA from '@/components/blocks/DefaultCTA';
import NotFound from '@/components/NotFound';
import { CustomRichText } from '@/components/payload/RichTextConverter';
import { getDocBySlug } from '@/lib/local-api';
import { Page } from '@/payload-types';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import config from '@payload-config';
import { getPayload } from 'payload';

const payload = await getPayload({ config });

export type IndexPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function IndexPage({ params }: IndexPageProps) {
  const data = await payload.findGlobal({
    slug: 'nav',
    depth: 2,
    select: { homepage: true }
  });
  const doc = data.homepage as Page;
  if (!doc) return <NotFound collectionSlug="pages" />;
  return (
    <>
      {doc.content?.map((block, index) => {
        return (
          <BlockRenderer
            key={'home' + index + 'block' + block.id}
            block={block}
            index={index}
          />
        );
      })}
    </>
  );
}
