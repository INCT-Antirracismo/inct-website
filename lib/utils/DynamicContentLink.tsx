'use client';

import Link, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import { RefAttributes, useEffect, useState } from 'react';

type DynamicContentLinkProps = {
  slug: string;
  collection: string;
  children: React.ReactNode | undefined;
  href?: string;
  className?: string;
  onClick?: any;
  target?: any;
};

export const collectionMap: any = {
  persons: '/pessoas',
  publications: '/publicacoes',
  researchProjects: '/projetos-de-pesquisa',
  events: '/eventos',
  posts: '/novidades',
  pages: ''
};

export function DynamicContentLink(props: DynamicContentLinkProps) {
  const { slug, collection, children, href } = props;
  const { lang } = useParams();
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (lang && !href) {
      if (collectionMap[collection] !== undefined) {
        setUrl(`/${lang}${collectionMap[collection]}/${slug}`);
      } else {
        console.log(collection);
        setUrl(`/${lang}/${collection}/${slug}`);
      }
    }
  }, [lang]);
  console.log(url);
  return (
    <Link {...props} href={href || url}>
      {children}
    </Link>
  );
}
