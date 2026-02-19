import {
  Organization,
  Page,
  Person,
  Post,
  Publication,
  ResearchProject,
  Event,
  DefinedTerm
} from '@/payload-types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDynamicContentURL(slug: string, collection: string) {
  if (collection === 'persons') {
    return `/pessoas/${slug}`;
  }
  if (collection === 'researchProjects') {
    return `/projetos-de-pesquisa/${slug}`;
  }
  if (collection === 'publications') {
    return `/publicacoes/${slug}`;
  }
  if (collection === 'events') {
    return `/eventos/${slug}`;
  }
  if (collection === 'posts') {
    return `/novidades/${slug}`;
  }
  if (collection === 'pages') {
    return `/${slug}`;
  }

  return `/${collection}/${slug}`;
}

export const applyPronounsToDefinedTerm = (
  pronouns: 'Masculino' | 'Feminino' | 'Neutro' | null | undefined,
  definedTerm: DefinedTerm
) => {
  return pronouns === 'Feminino' && definedTerm.nameFemale
    ? definedTerm.nameFemale
    : pronouns === 'Masculino' && definedTerm.nameMale
      ? definedTerm.nameMale
      : definedTerm.name;
};

export const buildListSentence = (strings: string[]) => {
  if (strings.length === 1) return strings[0];
  let last = strings.pop();
  return (
    strings.map((str, i) => (i === 0 ? str : str.toLowerCase())).join(', ') +
    ' e ' +
    last?.toLowerCase()
  );
};
