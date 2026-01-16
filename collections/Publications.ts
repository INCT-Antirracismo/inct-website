import { CollectionConfig, Field } from 'payload';
import {
  descriptionField,
  imageField,
  nameField,
  slugField,
  urlField
} from './fields/commonFields';
import {
  authenticated,
  authenticatedOrPublished,
  isEditor
} from '@/app/access';

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publicação', plural: 'Publicações' },
  access: {
    create: authenticated,
    delete: isEditor,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    description: 'Coleção de termos definidos.',
    group: 'Institucional'
  },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      name: 'type',
      label: 'Tipo de publicação',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['publicationType'] } },
      required: true,
      admin: { description: 'Do que se trata essa publicação? ' }
    },
    urlField,
    {
      name: 'datePublished',
      label: 'Data de Publicação',
      type: 'date',
      admin: {
        description: 'Data de publicação. Será exibido apenas o mês e ano.'
      }
    },
    { ...imageField, label: 'Imagem de Capa' } as Field,
    {
      name: 'files',
      label: 'Arquivos',
      labels: { singular: 'Arquivo', plural: 'Arquivos' },
      type: 'array',
      fields: [
        {
          name: 'file',
          label: 'Arquivo',
          type: 'upload',
          relationTo: 'files'
        }
      ]
    },
    {
      name: 'author',
      label: 'Autorias (INCT)',
      labels: {
        singular: 'Autoria',
        plural: 'Autorias'
      },
      type: 'array',
      admin: {
        description:
          'Pessoas do INCT, com cadastro no site, que trabalharam nesta publicação.'
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
          label: 'Pessoa',
          type: 'relationship',
          relationTo: ['persons'],
          required: true
        }
      ]
    },
    {
      name: 'creditText',
      type: 'textarea',
      label: 'Demais autores',
      admin: { description: 'Demais autorias da publicação.' }
    },
    { name: 'body', label: 'Outras Informações', type: 'richText' }
  ]
};
