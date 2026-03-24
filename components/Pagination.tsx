'use client';

import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';

export type PaginationProps = {
  config: {
    docs: any;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null;
    page?: number;
    pagingCounter: number;
    prevPage?: number | null;
    totalDocs: number;
    totalPages: number;
  };
  loading?: boolean;
};

const Pagination: NextPage<PaginationProps> = ({ config, loading }) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [str, setStr] = useState('?q=&p=');
  let { page, totalPages: numberOfPages } = config;
  if (!page) return null;

  useEffect(() => {
    let q = searchParams.get('q');
    if (q) {
      setStr(path + '?q=' + q + '&p=');
    } else {
      setStr(path + '?q=&p=');
    }
  }, [searchParams, path]);

  page = parseInt(page.toString());

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(page + 1, numberOfPages);
  const pagination = (numberOfPages: number) => {
    let rows = [];

    // Page Numbers
    for (let p = 1; p <= numberOfPages; p++) {
      if (p >= startPage && p <= endPage)
        // Leva pra "p"
        rows.push(
          <PaginationItem key={`pagination_${p}`}>
            <PaginationLink href={str + p} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        );
    }

    if (startPage > 1) {
      if (startPage !== 2) {
        // Ellipsis
        rows.unshift(
          <PaginationItem key={`pagination_paginationSpacer_1`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      // First page
      rows.unshift(
        // Leva pra 1
        <PaginationItem key={`pagination_firstPage`}>
          <PaginationLink href={str + 1}>1</PaginationLink>
        </PaginationItem>
      );

      // Previous
      if (startPage !== 2) {
        // page - 1
        rows.unshift(
          <PaginationItem key={`pagination_previousPage`}>
            <PaginationPrevious href={str + (page - 1)} />
          </PaginationItem>
        );
      }
    }

    // Ellipsis
    if (endPage < numberOfPages) {
      if (endPage !== numberOfPages - 1) {
        rows.push(
          <PaginationItem key={`pagination_paginationSpacer_2`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Total numberOfPages / totalPages
      rows.push(
        <PaginationItem key={`pagination_lastPage`}>
          <PaginationLink href={str + numberOfPages}>
            {numberOfPages}
          </PaginationLink>
        </PaginationItem>
      );

      // Next page + 1
      if (endPage !== numberOfPages - 1) {
        rows.push(
          <PaginationItem key={`pagination_nextPage`}>
            <PaginationNext href={str + (page + 1)} />
          </PaginationItem>
        );
      }
    }

    return rows;
  };
  return (
    <PaginationContainer
      className={`flex items-center justify-center mt-8 md:mt-16 ${loading ? 'animate-pulse pointer-events-none' : ''}`}
    >
      <PaginationContent>{pagination(numberOfPages)}</PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
