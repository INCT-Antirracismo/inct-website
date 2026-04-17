'use client';

import { cn } from '@/lib/utils';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Buttons from './Buttons';
import BGOrange from '@/public/bg_orange.jpg';
import BGBlue from '@/public/bg_blue.jpg';

export type DefaultCTAProps = {
  id?: string | null;
  title: string | null;
  label?: string | null;
  subtitle?: string | null;
  variant?: 'dark' | 'light' | 'sun' | null;
  buttons?:
    | { label: string; iconSlug: string; variant: string; url: string }[]
    | any[]
    | null;
  image?: any | null;
  imagePosition?: 'none' | 'left' | 'right' | 'background' | null;
  content?: any | null;
  height?: 'auto' | 'full' | '50' | '80' | null;
  centered?: boolean;
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
  height,
  centered
}: DefaultCTAProps) {
  return (
    <section
      className={cn(
        'bg-background font-sans dark:bg-black relative max-w-svw overflow-hidden bg-cover bg-center ',
        imagePosition !== 'background' && imagePosition !== 'none' && 'py-6',
        (variant === 'dark' || variant === 'sun') &&
          'bg-trinidad text-white bg-fixed'
      )}
      style={{
        backgroundImage:
          imagePosition === 'background' && !image.url.includes('.mp4')
            ? `url('${image.url}')`
            : variant === 'dark' && !image?.url
              ? `url('${BGBlue.src}')`
              : variant === 'sun' && !image?.url
                ? `url('${BGOrange.src}')`
                : ''
      }}
    >
      <div
        className={cn(
          'flex w-full md:items-center justify-between container mx-auto ',
          centered &&
            ' md:justify-center md:**:text-center! md:**:mx-auto! md:**-w-min! md:[&_li]:text-left!',
          image &&
            imagePosition !== 'background' &&
            imagePosition !== 'none' &&
            'px-0! gap-8 md:px-4'
        )}
      >
        {imagePosition === 'background' &&
          image &&
          image.url.includes('.mp4') && (
            <div className="absolute bg-cover bg-center h-svh w-svw z-1 top-0 left-0">
              <video
                className="videoTag object-fit object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={image.url} type="video/mp4" />
              </video>
            </div>
          )}
        <div
          className={cn(
            ' flex items-center justify-center relative z-2 py-20 lg:py-24 min-h-[33svh]',
            imagePosition === 'left' && 'order-2',
            height === 'full' && 'min-h-[calc(100svh-4rem)]',
            height === '80' && 'min-h-[80svh]',
            height === '50' && 'min-h-[calc(50svh+4rem)]'
          )}
        >
          <div
            className={cn(
              'flex flex-col',
              image &&
                imagePosition !== 'background' &&
                imagePosition !== 'none' &&
                'px-4'
            )}
          >
            <p
              className={cn(
                'uppercase text-sm md:text-base lg:text-lg xl:text-xl tracking-widest font-medium mb-2 text-muted-foreground dark:text-stone-200 max-w-prose text-balance',
                (variant === 'sun' || variant === 'dark') && 'text-sun-200'
              )}
            >
              {label}
            </p>
            <h1
              className={cn(
                'max-w-3xl leading-[1.2]! text-3xl md:text-4xl md:max-w-4xl lg:text-5xl lg:max-w-7xl tracking-tight text-dark-blue dark:text-zinc-50 text-balance font-bold',
                (variant === 'sun' || variant === 'dark') && 'text-trinidad-100'
              )}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                className={cn(
                  'max-w-prose w-full text-lg text-balance md:text-xl lg:text-2xl leading-snug text-stone-700 dark:text-zinc-100 mt-2 md:mt-3 xl:mt-4 lg:max-w-prose tracking-[0.018rem]',
                  (variant === 'sun' || variant === 'dark') && 'text-stone-100',
                  centered && 'mx-auto'
                )}
              >
                {subtitle}
              </p>
            ) : null}{' '}
            {content ? (
              <RichText
                data={content}
                className={cn(
                  'prose max-w-prose mt-6',
                  imagePosition === 'background' && '**:text-stone-0!',
                  (variant === 'sun' || variant === 'dark') &&
                    '**:text-stone-100!'
                )}
              />
            ) : null}
            {buttons!.length > 0 && (
              <div className="flex flex-col gap-3 text-base font-medium sm:flex-row mt-5 md:mt-8 flex-wrap">
                <Buttons buttons={buttons} />
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
      </div>
    </section>
  );
}
