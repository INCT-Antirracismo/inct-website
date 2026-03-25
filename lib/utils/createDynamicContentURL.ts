export function createDynamicContentURL(slug: string, collection: string) {
  const pathname = '';

  let lang = '';

  if (pathname.includes('/es/')) lang = 'es';

  if (collection === 'persons') {
    return `${lang}/pessoas/${slug}`;
  }
  if (collection === 'researchProjects') {
    return `${lang}/projetos-de-pesquisa/${slug}`;
  }
  if (collection === 'publications') {
    return `${lang}/publicacoes/${slug}`;
  }
  if (collection === 'events') {
    return `${lang}/eventos/${slug}`;
  }
  if (collection === 'posts') {
    return `${lang}/novidades/${slug}`;
  }
  if (collection === 'pages') {
    return `${lang}/${slug}`;
  }

  return `/${collection}/${slug}`;
}
