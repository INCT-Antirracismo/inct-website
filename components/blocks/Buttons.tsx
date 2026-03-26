'use client';

import { DynamicContentLink } from '@/lib/utils/DynamicContentLink';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Button } from '../ui/button';

export type ButtonsProps = { buttons: any };

export default function Buttons({ buttons }: ButtonsProps) {
  return (
    <>
      {buttons?.map((button: any, index: number) => {
        return (
          <DynamicContentLink
            key={button.id}
            slug={button.link.internalContent.value.slug}
            collection={button.link.internalContent.relationTo}
            href={
              button.link.linkType === 'external' ? button.link.url : undefined
            }
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
          </DynamicContentLink>
        );
      })}
    </>
  );
}
