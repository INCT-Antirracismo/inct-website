'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });
import DefaultCTA from '@/components/blocks/DefaultCTA';
import Link from 'next/link';
import { createDynamicContentURL } from '@/lib/utils';

export default async function Home() {
  const data = await payload.find({
    collection: 'pages'
  });
  const pages = data.docs;

  return (
    <>
      <div className="container mx-auto py-12 prose">
        <h1>INCT Antirracismo</h1>
        <h2>Coleções</h2>
        <ul>
          <li>
            <Link href={'/equipe'}>Lista de pessoas</Link>
          </li>
          <li>
            <Link href={'/organizations'}>Lista de organizações</Link>
          </li>
          <li>
            <Link href={'/projetos-de-pesquisa'}>
              Lista de projetos de pesquisa
            </Link>
          </li>
          <li>
            <Link href={'/publicacoes'}>Lista de publicações</Link>
          </li>
          <li>
            <Link href={'/eventos'}>Lista de eventos</Link>
          </li>
          <li>
            <Link href={'/novidades'}>Lista de novidades</Link>
          </li>
        </ul>
        <h2>Páginas</h2>
        <ul>
          {pages.map((page) => (
            <li key={`${page.id}_pagina`}>
              <Link href={createDynamicContentURL(page, 'pages')}>
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
