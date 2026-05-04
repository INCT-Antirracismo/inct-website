'use client';

import { useId } from 'react';
import SocialMediaLogos from './SocialMediaLogos';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export type SocialMediaBarProps = {
  data:
    | {
        url?: string | null;
        type?:
          | (
              | 'instagram'
              | 'youtube'
              | 'personalWebsite'
              | 'facebook'
              | 'linkedin'
              | 'tiktok'
              | 'substack'
              | 'twitter'
              | 'bluesky'
              | 'flickr'
            )
          | null;
        id?: string | null;
      }[]
    | null
    | undefined;
} & React.ComponentProps<'svg'>;

export default function SocialMediaBar(props: SocialMediaBarProps) {
  const id = useId();
  return (
    <div className="flex items-center justify-center gap-5 w-fit my-5 not-prose social-media-bar">
      {props.data!?.length > 0 &&
        props.data?.map((media) => {
          if (media.type && media.url) {
            const Element = SocialMediaLogos[media.type].component;
            return (
              <Tooltip key={media.id + id}>
                <TooltipTrigger>
                  <a
                    href={media.url}
                    target="_blank"
                    title={SocialMediaLogos[media.type].name}
                  >
                    <Element {...props} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  {SocialMediaLogos[media.type].name}
                </TooltipContent>
              </Tooltip>
            );
          }
          return null;
        })}
    </div>
  );
}
