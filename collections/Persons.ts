import { CollectionConfig, Field } from 'payload';
import {
  descriptionField,
  imageField,
  nameField,
  slugField,
  socialMediaField,
  urlField
} from './fields/commonFields';
import {
  authenticated,
  authenticatedOrPublished,
  isEditor
} from '@/app/access';

export const Persons: CollectionConfig = {
  slug: 'persons',
  labels: { singular: 'Pessoa', plural: 'Pessoas' },
  access: {
    create: authenticated,
    delete: isEditor,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'jobTitle', 'description'],
    group: 'Institucional'
  },
  fields: [
    slugField,
    nameField,
    {
      name: 'pronouns',
      label: 'Pronomes',
      type: 'select',
      options: ['Masculino', 'Feminino', 'Neutro']
    },
    {
      ...descriptionField,
      admin: { description: 'Bio curta da pessoa.' }
    } as Field,
    { ...imageField, label: 'Foto' } as Field,
    { name: 'email', type: 'email', label: 'E-mail' },
    { ...urlField, label: 'URL do Lattes' } as Field,
    socialMediaField,

    { name: 'body', label: 'Sobre', type: 'richText' },
    {
      name: 'inctPosition',
      label: 'Vínculos com o INCT Antirracismo',
      admin: { description: 'Qual a posição dentro da estrutura deste INCT?' },
      hasMany: true,
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['occupation'] } },
      required: true
    },
    {
      name: 'inctGroup',
      label: 'Núcleo no INCT',
      type: 'relationship',
      hasMany: true,
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['inctGroup'] } }
    },
    {
      name: 'researchProjects',
      label: 'Projetos de Pesquisa',
      labels: {
        singular: 'Projeto de Pesquisa',
        plural: 'Projetos de Pesquisa'
      },
      type: 'array',
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
          name: 'researchProject',
          label: 'Projeto de Pesquisa',
          type: 'relationship',
          relationTo: ['researchProjects'],
          required: true
        }
      ]
    },
    {
      name: 'memberOf',
      label: 'Vínculos com outras instituições',
      labels: {
        singular: 'Vínculo com outra instituição',
        plural: 'Vínculos com outras instituições'
      },
      type: 'array',
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
          label: 'Instituição',
          type: 'relationship',
          relationTo: ['organizations'],
          required: true
        }
      ]
    }
  ]
};

//
