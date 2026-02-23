'use client';

import { useState } from 'react';
import { CustomRichText } from './payload/RichTextConverter';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export type CollapsibleBodyContentProps = {
  body:
    | {
        [k: string]: unknown;
        root: {
          type: string;
          children: {
            type: any;
            version: number;
            [k: string]: unknown;
          }[];
          direction: ('ltr' | 'rtl') | null;
          format:
            | 'left'
            | 'start'
            | 'center'
            | 'right'
            | 'end'
            | 'justify'
            | '';
          indent: number;
          version: number;
        };
      }
    | null
    | undefined;
};

export default function CollapsibleBodyContent({
  body
}: CollapsibleBodyContentProps) {
  const [open, setOpen] = useState(false);
  const plainText = convertLexicalToPlaintext({
    data: body as SerializedEditorState
  });
  return (
    <section
      className={cn(
        'relative overflow-hidden w-full',
        !open && plainText.length > 500 && 'max-h-56'
      )}
      aria-hidden={!open}
    >
      {!open && plainText.length > 500 && (
        <>
          <div className="absolute w-full py-2 bottom-0 left-0 z-3">
            <div className="max-w-prose">
              <Button
                variant={'secondary'}
                className="w-full"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="body-content"
              >
                Leia mais <ChevronDown />
              </Button>
            </div>
          </div>
          <div className="absolute w-full h-5/6 bg-linear-to-t from-white/90  via-35% via-white/80 to-transparent bottom-0 left-0 z-2"></div>
        </>
      )}
      <div className="prose pb-5">
        <CustomRichText lexicalData={body as any} />
      </div>
      {open && (
        <div className="max-w-prose">
          <Button
            variant={'secondary'}
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Ocultar texto <ChevronUp />
          </Button>
        </div>
      )}
    </section>
  );
}
