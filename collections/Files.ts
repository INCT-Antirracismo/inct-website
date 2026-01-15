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
      type: 'text',
      label: 'Nome do arquivo (ALT)',
      admin: {
        description: 'Coloque o nome do arquivo e/ou uma descrição curta.'
      },
      required: true
    },
    {
      name: 'author',
      type: 'text',
      label: 'Créditos',
      admin: {
        description: 'Coloque a fonte do arquivo.'
      }
    }
  ]
};
