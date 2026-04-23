import { cn } from '@/lib/utils';
import * as React from 'react';

export const Width: React.FC<{
  children: React.ReactNode;
  width?: number;
}> = ({ children, width }) => {
  return (
    <div
      className={cn('col-span-2', width?.toString() === '50' && 'col-span-1')}
    >
      {children}
    </div>
  );
};
