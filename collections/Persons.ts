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
  labels: { singular: 'Pesquisadora', plural: 'Pesquisadoras' },
  access: {
    create: authenticated,
    delete: isEditor,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    description: 'Professores, alunos, palestrantes, etc.',
    defaultColumns: ['image', 'name', 'jobTitle', 'description'],
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
      name: 'jobTitle',
      label: 'Vínculos com o INCT Antirracismo',
      admin: { description: 'Qual a posição dentro da estrutura deste INCT?' },
      hasMany: true,
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['occupation'] } },
      required: true
    },
    {
      name: 'memberOf',
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
          label: 'Projeto de pesquisa',
          type: 'relationship',
          relationTo: ['researchProjects'],
          required: true
        }
      ]
    },
    {
      name: 'relations',
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
