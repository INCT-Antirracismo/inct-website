'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/lib/utils/useDebounce';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export const Search: React.FC = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const router = useRouter();
  const [prevValue, setPrevValue] = useState('XXX');

  const q = searchParams.get('q');
  const p = searchParams.get('p');

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue;
    }
  }, [value]);

  useEffect(() => {
    if (q && !value) {
      setValue(q);
    }
  }, [q]);

  useEffect(() => {
    let queryString = '';
    let qChar = '?';

    [
      { value: debouncedValue, key: 'q' },
      { value: p, key: 'p' }
    ].forEach((element, index) => {
      if (element.value) {
        queryString += qChar;
        qChar = '&';
        queryString += `${element.key}=${element.value}`;
      }
    });
    router.push(`${path}${queryString}`);
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
