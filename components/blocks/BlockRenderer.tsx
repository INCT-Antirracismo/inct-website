import { CustomRichText } from '../payload/RichTextConverter';
import Buttons from './Buttons';
import ContentList from './contentList/ContentList';
import DefaultCTA from './DefaultCTA';

export type BlockRendererProps = { block: any; index: number };

export default function BlockRenderer({ block, index }: BlockRendererProps) {
  if (block.blockType === 'defaultCTABlock') {
    return <DefaultCTA key={`block_${block.id}_${index}`} {...block} />;
  }
  if (block.blockType === 'richTextBlock') {
    return (
      <div
        key={`block_${block.id}_${index}`}
        className="container mx-auto px-4 lg:px-8 my-8 lg:my-16 grid justify-center"
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
      />
    );
  }

  return <div className="w-full"></div>;
}
