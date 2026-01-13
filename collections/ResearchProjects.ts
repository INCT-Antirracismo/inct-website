import {
  authenticated,
  authenticatedOrPublished,
  isEditor
} from '@/app/access';
import { CollectionConfig } from 'payload';
import { descriptionField, nameField, slugField } from './fields/commonFields';

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
      label: 'Membros',
      name: 'members',
      type: 'join',
      collection: 'persons',
      on: 'memberOf.researchProject',
      admin: {
        defaultColumns: ['image', 'name', 'description'],
        description:
          'Esse campo serve apenas para listar os membros. Para editar a relação da pessoa com o projeto de pesquisa, edite no documento da pessoa.'
      }
    },
    {
      name: 'funder',
      label: 'Financiador/es',
      type: 'relationship',
      relationTo: 'organizations',
      hasMany: true
    },
    { name: 'body', label: 'Sobre', type: 'richText' }
  ]
};
