'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export type LocaleSelectorProps = {};

export default function LocaleSelector(props: LocaleSelectorProps) {
  const pathname = usePathname();
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Button variant="ghost" size="icon" asChild>
        <Link
          href={pathname.replace('/es', '/pt-BR')}
          className={cn(
            'hover:text-foreground',
            pathname.includes('/pt-BR') && 'font-bold! pointer-events-none'
          )}
        >
          PT
        </Link>
      </Button>
      <span className="opacity-50">|</span>
      <Button variant="ghost" size="icon" asChild>
        <Link
          href={pathname.replace('/pt-BR', '/es')}
          className={cn(
            'hover:text-foreground',
            pathname.includes('/es') && 'font-bold! pointer-events-none'
          )}
        >
          ES
        </Link>
      </Button>
    </div>
  );
}
