import {
  AppWindow,
  BookA,
  Calendar,
  File,
  Image,
  LucideProps,
  Menu,
  Newspaper,
  NotebookPen,
  PanelBottom,
  Search,
  University,
  User,
  User2
} from 'lucide-react';
import { CollectionSlug, GlobalSlug } from 'payload';
import { ExoticComponent } from 'react';

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  users: User,
  media: Image,
  files: File,
  organizations: University,
  persons: User2,
  definedTerms: BookA,
  publications: Newspaper,
  researchProjects: Search,
  nav: Menu,
  pages: AppWindow,
  posts: NotebookPen,
  footer: PanelBottom,
  events: Calendar
};

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug)
    ? navIconMap[slug as CollectionSlug | GlobalSlug]
    : undefined;
