import {
  authenticated,
  authenticatedOrPublished,
  isEditor
} from '@/app/access';
import { CollectionConfig } from 'payload';
import {
  descriptionField,
  nameField,
  slugField,
  urlField
} from './fields/commonFields';

export const ResearchProjects: CollectionConfig = {
  slug: 'researchProjects',
  labels: { singular: 'Projeto de Pesquisa', plural: 'Projetos de Pesquisa' },
  access: {
    create: authenticated,
    delete: isEditor,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    description: '',
    group: 'Institucional'
  },
  fields: [
    slugField,
    nameField,
    descriptionField,
    {
      name: 'status',
      label: 'Situação',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['status'] } },
      required: true,
      admin: {
        description: 'Em qual situação se encontra o projeto de pesquisa?'
      }
    },
    urlField,
    {
      name: 'type',
      label: 'Tipo de Projeto',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['researchProjectType'] } },
      required: true,
      admin: { description: 'Do que se trata esse projeto? ' }
    },
    {
      label: 'Membros',
      name: 'members',
      type: 'join',
      collection: 'persons',
      on: 'researchProjects.researchProject',
      admin: {
        defaultColumns: ['image', 'name', 'description'],
        description:
          'Esse campo serve apenas para listar os membros. Para editar a relação da pessoa com o projeto de pesquisa, edite no documento da pessoa.'
      }
    },
    {
      name: 'relations',
      label: 'Organizações Envolvidas',
      labels: {
        singular: 'Organização Envolvida',
        plural: 'Organizações Envolvidas'
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
          label: 'Organização',
          type: 'relationship',
          relationTo: ['organizations'],
          required: true
        }
      ]
    },
    { name: 'body', label: 'Outras Informações', type: 'richText' }
  ]
};
