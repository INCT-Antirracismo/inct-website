'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import { useDebounce } from '@/lib/utils/useDebounce';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';

export const Search: React.FC = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const router = useRouter();

  const q = searchParams.get('q');

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (q && !value) {
      setValue(q);
    }
  }, [q]);

  useEffect(() => {
    router.push(`${path}${debouncedValue ? `?q=${debouncedValue}` : ''}`);
  }, [debouncedValue, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Label htmlFor="search" className={cn('mb-3')}>
        Busca
      </Label>
      <div className="relative max-w-96 w-full">
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="Busca"
          value={value}
        />
        <Button
          type="submit"
          variant={'secondary'}
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};
