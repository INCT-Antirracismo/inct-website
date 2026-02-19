'use client';

import { Button } from '@/components/ui/button';
import { cn, createDynamicContentURL } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Sparkles } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link';

export type DefaultCTAProps = {
  title: string | null;
  label?: string | null;
  subtitle?: string | null;
  variant?: 'dark' | 'light' | null;
  buttons?:
    | { label: string; iconSlug: string; variant: string; url: string }[]
    | any[]
    | null;
  image?: any | null;
  imagePosition?: 'none' | 'left' | 'right' | 'background' | null;
  content?: any | null;
  height?: 'auto' | 'full' | '80' | null;
};

export default function DefaultCTA({
  title,
  label,
  subtitle,
  variant,
  imagePosition,
  buttons,
  image,
  content,
  height
}: DefaultCTAProps) {
  return (
    <div
      className={cn(
        'bg-stone-50 font-sans dark:bg-black',
        variant === 'dark' && 'bg-trinidad text-white '
      )}
    >
      <main
        className={cn(
          'relative flex w-full md:items-center justify-between',
          !image || imagePosition === 'background' || imagePosition === 'none'
            ? ' md:justify-center md:**:text-center! md:**:mx-auto! md:**-w-min! md:[&_li]:text-left!'
            : '',
          imagePosition === 'background' && 'dark bg-trinidad'
        )}
      >
        {imagePosition === 'background' && (
          <div
            className="absolute bg-cover bg-center w-full h-full z-1 opacity-80"
            style={{
              backgroundImage:
                imagePosition === 'background' ? `url('${image.url}')` : 'none'
            }}
          ></div>
        )}
        <div
          className={cn(
            ' flex items-center justify-center relative z-2 py-16 md:py-24 lg:py-32',
            imagePosition === 'left' && 'order-2',
            height === 'full' && 'min-h-screen',
            height === '80' && 'min-h-[80svh]'
          )}
        >
          <div className={cn('flex flex-col px-6 md:px-8')}>
            <p
              className={cn(
                'uppercase text-xs sm:text-sm xl:text-base tracking-wide font-medium mb-2 text-muted-foreground dark:text-stone-200 max-w-prose text-balance',
                variant === 'dark' && 'text-sun-300'
              )}
            >
              {label}
            </p>
            <h1
              className={cn(
                'max-w-3xl text-2xl leading-[1.2]! sm:text-3xl lg:text-4xl lg:max-w-4xl xl:text-5xl tracking-tight text-dark-blue dark:text-zinc-50 text-balance font-extrabold',
                variant === 'dark' && 'text-trinidad-100'
              )}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                className={cn(
                  'max-w-prose w-full text-base text-balance leading-6.5 sm:text-lg md:text-xl xl:text-2xl md:leading-8 text-stone-700 dark:text-zinc-100 mt-2 md:mt-3 xl:mt-5',
                  variant === 'dark' && 'text-stone-100'
                )}
              >
                {subtitle}
              </p>
            ) : null}{' '}
            {content ? (
              <RichText
                data={content}
                className={cn(
                  'prose max-w-prose ',
                  imagePosition === 'background' && '**:text-stone-0!'
                )}
              />
            ) : null}
            {buttons!.length > 0 && (
              <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8 flex-wrap">
                {buttons?.map((button, index) => {
                  let url: string;
                  if (button.link.linkType === 'external') {
                    url = button.link.url;
                  } else {
                    url = createDynamicContentURL(
                      button.link.internalContent.value.slug,
                      button.link.internalContent.relationTo
                    );
                  }
                  return (
                    <Link
                      key={button.id}
                      href={url}
                      target={button.link.targetBlank ? '_blank' : '_self'}
                    >
                      <Button variant={button.variant}>
                        {button.iconSlug && button.iconPosition === 'left' ? (
                          <DynamicIcon name={button.iconSlug} size={48} />
                        ) : null}
                        {button.label}
                        {button.iconSlug && button.iconPosition === 'right' ? (
                          <DynamicIcon name={button.iconSlug} size={48} />
                        ) : null}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {image && imagePosition !== 'background' && imagePosition !== 'none' ? (
          <div
            className={cn(
              'w-1/4 md:w-1/2  shrink-0 flex justify-center md:p-4 sticky top-0 md:static lg:p-8 ',
              imagePosition === 'left' && 'order-1',
              height === 'full' && 'h-svh',
              height === '80' && 'h-[80svh]'
            )}
          >
            <div
              className={cn(
                'relative  w-full h-full flex items-center justify-center grow overflow-hidden',
                height === 'full' || height === '80'
                  ? ''
                  : 'md:aspect-square md:max-h-[60svh] md:min-h-96'
              )}
            >
              <img
                src={
                  image.sizes?.card?.url ? image.sizes?.card?.url : image.url
                }
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
