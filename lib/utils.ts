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

export function createDynamicContentURL(
  document:
    | Person
    | Page
    | ResearchProject
    | Post
    | Event
    | Organization
    | Publication,
  collection: string
) {
  if (collection === 'persons') {
    return `/pessoas/${document.slug}`;
  }
  if (collection === 'researchProjects') {
    return `/projetos-de-pesquisa/${document.slug}`;
  }
  if (collection === 'publications') {
    return `/publicacoes/${document.slug}`;
  }
  if (collection === 'events') {
    return `/eventos/${document.slug}`;
  }
  if (collection === 'posts') {
    return `/novidades/${document.slug}`;
  }
  if (collection === 'pages') {
    return `/${document.slug}`;
  }

  return `/${collection}/${document.slug}`;
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
