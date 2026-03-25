'use client';

import { createDynamicContentURL } from '@/lib/utils/createDynamicContentURL';
import Link from 'next/link';
import { Button } from '../ui/button';
import { DynamicIcon } from 'lucide-react/dynamic';

export type ButtonsProps = { buttons: any };

export default function Buttons({ buttons }: ButtonsProps) {
  return (
    <>
      {buttons?.map((button: any, index: number) => {
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
    </>
  );
}
