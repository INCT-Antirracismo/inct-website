'use client';
import React from 'react';
import type { BeforeDocumentControlsClientProps } from 'payload';
import { useDocumentInfo, useField } from '@payloadcms/ui';
import { createDynamicContentURL } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

export function VisitContent(props: BeforeDocumentControlsClientProps) {
  const { value: slug } = useField({ path: 'slug' });
  const { collectionSlug } = useDocumentInfo();
  return (
    <a
      target="_blank"
      href={createDynamicContentURL(slug as string, collectionSlug as string)}
    >
      Visitar <ExternalLink className="size-4" />
    </a>
  );
}
