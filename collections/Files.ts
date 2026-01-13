import { authenticated, authenticatedOrPublished } from '@/app/access';
import type { CollectionConfig } from 'payload';

export const Files: CollectionConfig = {
  labels: { singular: 'Arquivo', plural: 'Arquivos' },
  slug: 'files',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: { group: 'Arquivos' },
  upload: {
    staticDir: 'files'
  },
  fields: [
    {
      name: 'alt',
      type: 'text'
    }
  ]
};
