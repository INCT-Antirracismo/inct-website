'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type LocaleSelectorProps = {};

export default function LocaleSelector(props: LocaleSelectorProps) {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link
        href={pathname.replace('/es', '/pt-BR')}
        className={cn(
          'hover:text-foreground',
          pathname.includes('/pt-BR') && 'font-bold pointer-events-none'
        )}
      >
        PT
      </Link>
      <span>|</span>
      <Link
        href={pathname.replace('/pt-BR', '/es')}
        className={cn(
          'hover:text-foreground',
          pathname.includes('/es') && 'font-bold pointer-events-none'
        )}
      >
        ES
      </Link>
    </div>
  );
}
