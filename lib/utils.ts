import {
  Organization,
  Page,
  Person,
  Post,
  Publication,
  ResearchProject,
  Event
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
