import { authenticated, authenticatedOrPublished } from '@/app/access';
import { CollectionConfig } from 'payload';
import { defaultCTABlock } from './fields/blocks/defaultCTA';
import { descriptionField, nameField, slugField } from './fields/commonFields';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    group: 'Website'
  },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      name: 'content',
      type: 'blocks',
      blocks: [defaultCTABlock]
    }
  ]
};
