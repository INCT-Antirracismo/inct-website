import { CollectionConfig, Field } from 'payload';
import {
  descriptionField,
  imageField,
  locationField,
  nameField,
  slugField,
  urlField
} from './fields/commonFields';
import { authenticated, authenticatedOrPublished } from '@/app/access';
import { richTextBlock } from './fields/blocks/richTextBlock';

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Evento', plural: 'Eventos' },
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
      label: 'Organizadores',
      labels: {
        singular: 'Organizador',
        plural: 'Organizadores'
      },
      type: 'array',
      admin: {
        description: 'Pessoas e instituições responsáveis pelo evento.'
      },
      fields: [
        {
          name: 'relationType',
          label: 'Vínculo',
          type: 'relationship',
          relationTo: 'definedTerms',
          filterOptions: { additionalType: { in: ['occupation'] } },
          hasMany: true,
          required: true
        },
        {
          name: 'relationTo',
          label: 'Pessoa ou Organização',
          type: 'relationship',
          relationTo: ['organizations', 'persons'],
          required: true
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          label: 'Data de Início',
          type: 'date',
          admin: { date: { pickerAppearance: 'dayAndTime' } }
        },
        {
          name: 'endDate',
          label: 'Data de Término',
          type: 'date',
          admin: { date: { pickerAppearance: 'dayAndTime' } }
        }
      ]
    },
    urlField,
    { label: 'Endereço', name: 'address', type: 'text' },
    locationField,
    {
      name: 'files',
      label: 'Anexos',
      labels: { singular: 'Anexo', plural: 'Anexos' },
      type: 'array',
      fields: [
        {
          name: 'file',
          label: 'Anexo',
          type: 'upload',
          relationTo: 'files'
        }
      ]
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
