import { cn } from '@/lib/utils';
import { CustomRichText } from '../payload/RichTextConverter';
import Buttons from './Buttons';
import ContentList from './contentList/ContentList';
import DefaultCTA from './DefaultCTA';
import CarouselCTABlock from './CarouselCTABlock';

export type BlockRendererProps = {
  block: any;
  index: number;
  params?: {
    q: string;
    p: string;
  };
  lang?: string;
};

export default async function BlockRenderer({
  block,
  index,
  params,
  lang = 'pt-BR'
}: BlockRendererProps) {
  if (block.blockType === 'defaultCTABlock') {
    return <DefaultCTA key={`block_${block.id}_${index}`} {...block} />;
  }
  if (block.blockType === 'carouselCTABlock') {
    return <CarouselCTABlock key={`block_${block.id}_${index}`} {...block} />;
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
        lang={lang}
      />
    );
  }
  if (block.blockType === 'spacerBlock') {
    return (
      <div
        key={`block_${block.id}_${index}`}
        className={cn(
          'w-full h-4 md:h-8',
          block.size === 'M' && 'h-8 md:h-16',
          block.size === 'G' && 'h-12 md:h-24'
        )}
      ></div>
    );
  }

  return <div className="w-full"></div>;
}
