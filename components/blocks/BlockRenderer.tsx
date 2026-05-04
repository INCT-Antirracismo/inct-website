import { cn } from '@/lib/utils';
import { CustomRichText } from './RichTextConverter';
import Buttons from './Buttons';
import ContentList from './contentList/ContentList';
import DefaultCTA from './DefaultCTA';
import CarouselCTABlock from './CarouselCTABlock';
import Cards from './Cards';
import { FormBlock } from './Form';
import FeaturedPosts from './FeaturedPosts';

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

  if (block.blockType === 'formBlock') {
    const { blockName, blockType, form } = block;
    const formID: string = form && (typeof form === 'string' ? form : form.id);
    return <FormBlock key={`block_${block.id}_form_${formID}`} {...block} />;
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
  if (block.blockType === 'featuredPosts') {
    return (
      <FeaturedPosts
        key={`block_${block.id}_${index}`}
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
  if (block.blockType === 'cardsBlock') {
    return <Cards {...block} />;
  }

  return (
    <div className="w-full text-xs wrap-break-word">
      {JSON.stringify(block)}
    </div>
  );
}
