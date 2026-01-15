import { authenticated, authenticatedOrPublished } from '@/app/access';
import { CollectionConfig, Field } from 'payload';
import { defaultCTABlock } from './fields/blocks/defaultCTA';
import {
  descriptionField,
  imageField,
  nameField,
  slugField
} from './fields/commonFields';
import { richTextBlock } from './fields/blocks/richTextBlock';

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
    { ...imageField, label: 'Imagem para SEO' } as Field,
    {
      name: 'content',
      label: 'Conteúdo',
      labels: { singular: 'Bloco', plural: 'Bloco' },
      type: 'blocks',
      blocks: [defaultCTABlock, richTextBlock]
    }
  ]
};
