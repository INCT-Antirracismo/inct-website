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
  isSlide?: boolean;
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
  centered,
  isSlide = false
}: DefaultCTAProps) {
  return (
    <section
      className={cn(
        'bg-background min-h-[40svh] flex items-center justify-center font-sans dark:bg-black relative max-w-svw overflow-hidden bg-cover bg-center',
        imagePosition !== 'background' &&
          imagePosition !== 'none' &&
          'py-6 px-4 lg:px-8',
        (variant === 'dark' || variant === 'sun') &&
          'bg-trinidad text-white bg-fixed',
        isSlide && 'h-full'
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
          'grid w-full md:items-center justify-between container mx-auto ',
          centered &&
            ' justify-center **:text-center! **:mx-auto! **-w-min! [&_li]:text-left!',
          image &&
            imagePosition !== 'background' &&
            imagePosition !== 'none' &&
            'px-0! gap-8 md:px-4 md:grid-cols-2'
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
        {/* Content */}
        <div
          className={cn(
            'flex items-center md:justify-center relative z-2 pt-8 pb-12 md:py-20 lg:py-24 md:min-h-[33svh] order-2 md:order-1 w-full',
            imagePosition === 'left' && 'md:order-2',
            imagePosition === 'background' && 'py-18',
            height === 'full' && 'md:min-h-[calc(100svh-4rem)]',
            height === '80' && 'md:min-h-[80svh]',
            height === '50' && 'md:min-h-[calc(50svh+4rem)]'
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
                'leading-[1.2]! text-3xl md:text-4xl md:max-w-4xl lg:text-5xl lg:max-w-7xl  tracking-tight text-dark-blue dark:text-zinc-50 text-balance font-bold',
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
        {/* Image */}
        {image && imagePosition !== 'background' && imagePosition !== 'none' ? (
          <div
            className={cn(
              'order-1 md:order-2 px-4 md:px-0 h-full',
              imagePosition === 'left' && 'md:order-1',
              height === 'full' && 'h-svh',
              height === '80' && 'h-[80svh]'
            )}
          >
            <div
              className={cn(
                'relative h-full overflow-hidden',
                height === 'full' || height === '80' || height === '50'
                  ? ''
                  : 'max-h-[40svh] md:max-h-[60svh] md:min-h-96'
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
