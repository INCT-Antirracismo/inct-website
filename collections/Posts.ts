import { authenticated, authenticatedOrPublished } from '@/app/access';
import { CollectionConfig, Field } from 'payload';
import { richTextBlock } from './fields/blocks/richTextBlock';
import {
  descriptionField,
  imageField,
  nameField,
  slugField
} from './fields/commonFields';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
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
    { ...imageField, label: 'Imagem de Capa' } as Field,

    {
      name: 'imageOrientation',
      type: 'radio',
      label: 'Orientação da imagem',
      options: [
        { label: 'Paisagem', value: 'landscape' },
        { label: 'Retrato', value: 'portrait' }
      ],
      defaultValue: 'landscape'
    },
    {
      name: 'author',
      label: 'Autoria',
      type: 'relationship',
      relationTo: 'persons',
      hasMany: true
    },
    {
      name: 'content',
      label: 'Conteúdo',
      labels: { singular: 'Bloco', plural: 'Bloco' },
      type: 'blocks',
      blocks: [richTextBlock]
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['tag'] } }
    }
  ]
};
