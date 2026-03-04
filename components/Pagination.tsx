'use client';

import { AlertTriangle } from 'lucide-react';

export type PaginationProps = {};

export default function Pagination(props: PaginationProps) {
  return (
    <div className="flex items-center justify-center my-8">
      <p className="text-trinidad font-medium flex items-center gap-2">
        <AlertTriangle /> Adicionar paginação aqui
      </p>
    </div>
  );
}
