'use client';

import { cn, createDynamicContentURL } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export type NavButtonProps = { menu: any };

export default function NavButton({ menu }: NavButtonProps) {
  const { slug } = useParams();
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      className={cn(
        'text-left text-sm lg:text-base font-medium tracking-wide hover:underline decoration-trinidad decoration-2 underline-offset-2 group px-4 xl:px-6 group hover:bg-background border-x border-transparent hover:border-inherit'
        // menu.items
        //   ?.map((item: any) => item.link!.internalContent.value.slug)
        //   .includes(slug) && 'font-semibold'
      )}
    >
      <Link
        href={
          menu.items!.length > 0
            ? createDynamicContentURL(
                (menu.items![0].link!.internalContent as any).value.slug,
                (menu.items![0].link!.internalContent as any).relationTo
              )
            : '#'
        }
        className="h-16 flex items-center"
        onClick={() => {
          if (ref.current) {
            (ref.current as any).style.pointerEvents = 'none';
            setTimeout(() => {
              (ref.current as any).style.pointerEvents = 'initial';
            }, 500);
          }
        }}
      >
        {menu.label}
      </Link>
      <div className="w-full py-8 bg-white absolute top-full left-0 z-50 hidden group-hover:block group-focus:block border-y">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="">
              <p className="text-lg font-normal text-balance text-muted-foreground">
                {menu.text}
              </p>
            </div>
            <div className="col-span-2">
              <h2 className="font-medium text-xs uppercase tracking-widest text-deep-sea-green pl-3 leading-7">
                {menu.label}
              </h2>
              <ul className="flex flex-wrap gap-3 gap-x-3 justify-start ">
                {menu.items?.map((item: any) => {
                  return (
                    <li key={item.id} className="w-64">
                      <Link
                        href={createDynamicContentURL(
                          item.link!.internalContent.value.slug,
                          item.link!.internalContent.relationTo
                        )}
                        className={cn(
                          'p-2 rounded border border-transparent hover:bg-background w-full group/menu-item inline-block',
                          slug === item.link!.internalContent.value.slug &&
                            'bg-background'
                        )}
                        onClick={() => {
                          if (ref.current) {
                            (ref.current as any).style.pointerEvents = 'none';
                            setTimeout(() => {
                              (ref.current as any).style.pointerEvents =
                                'initial';
                            }, 1500);
                          }
                        }}
                      >
                        <h3
                          className={cn(
                            'text-base font-medium decoration-trinidad underline-offset-2 decoration-2 group-hover/menu-item:underline mb-0.5',
                            slug === item.link!.internalContent.value.slug &&
                              'underline'
                          )}
                        >
                          {item.link.linkType === 'internal'
                            ? item.link!.internalContent!.value!.acronym ||
                              item.link!.internalContent!.value!.name
                            : 'Link Externo'}
                        </h3>
                        <p className="text-sm font-normal text-muted-foreground text-pretty">
                          {item.text}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
