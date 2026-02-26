import { cn } from '@/lib/utils';
import { CustomRichText } from '../payload/RichTextConverter';
import Buttons from './Buttons';
import ContentList from './contentList/ContentList';
import DefaultCTA from './DefaultCTA';

export type BlockRendererProps = {
  block: any;
  index: number;
  params?: {
    q: string;
    p: string;
  };
};

export default async function BlockRenderer({
  block,
  index,
  params
}: BlockRendererProps) {
  if (block.blockType === 'defaultCTABlock') {
    return <DefaultCTA key={`block_${block.id}_${index}`} {...block} />;
  }
  if (block.blockType === 'richTextBlock') {
    return (
      <div
        key={`block_${block.id}_${index}`}
        className={cn(
          'container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid',
          block.centered && 'justify-center'
        )}
      >
        <CustomRichText lexicalData={block.body as any} />
      </div>
    );
  }

  if (block.blockType === 'contentList') {
    return (
      <ContentList
        key={`block_${block.id}_${index}`}
        collectionSlug={block.collectionSlug}
        block={block}
        params={params}
      />
    );
  }

  return <div className="w-full"></div>;
}
