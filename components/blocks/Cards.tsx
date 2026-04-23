'use client';

import { cn } from '@/lib/utils';
import { CustomRichText } from './RichTextConverter';

export type CardsProps = {
  id: string;
  items: { id: string; title: string; content: any }[];
};

export default function Cards({ id, items }: CardsProps) {
  const { name, description, centered } = {
    name: 'Componente de Cards',
    description: 'Runtime ReferenceError',
    centered: true
  };
  return (
    <div className={cn('container mx-auto px-4 lg:px-8 py-8 lg:pb-8 lg:pt-16')}>
      {name || description ? (
        <div className={cn('mb-8 border-b pb-3', centered && 'text-center')}>
          {name ? (
            <h2 className="text-balance font-bold text-2xl mb-1">{name}</h2>
          ) : null}

          {description ? (
            <p className="text-balance text-muted-foreground mb-3">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          'grid md:grid-cols-2 gap-8',
          items.length === 1 && 'justify-center md:grid-cols-1 max-w-4xl',
          items.length === 3 && 'md:grid-cols-1 lg:grid-cols-3'
        )}
      >
        {items.map((item) => {
          return (
            <div
              key={item.id + id}
              className="bg-white p-5 rounded-xs border-2 border-sun"
            >
              <h3 className="font-medium text-2xl mb-3">{item.title}</h3>
              <CustomRichText
                className="lg:prose-lg"
                lexicalData={item.content as any}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
