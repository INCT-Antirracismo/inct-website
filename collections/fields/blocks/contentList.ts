import { Block, Field } from 'payload';
import { buttonsField, descriptionField, nameField } from '../commonFields';

export const contentList: Block = {
  labels: { singular: 'Lista de conteúdo', plural: 'Lista de conteúdo' },
  slug: 'contentList',
  fields: [
    { ...nameField, required: false } as Field,
    {
      name: 'centered',
      type: 'checkbox',
      label: 'Centralizar cabeçalho',
      defaultValue: true
    },
    descriptionField,
    buttonsField,
    {
      name: 'collectionSlug',
      label: 'Tipo de Conteúdo',
      type: 'select',
      options: [
        { value: 'publications', label: 'Publicações' },
        { value: 'persons', label: 'Pessoas' },
        { value: 'researchProjects', label: 'Projetos de Pesquisa' },
        { value: 'posts', label: 'Posts' },
        { value: 'events', label: 'Eventos' },
        { value: 'organizations', label: 'Organizações' }
      ]
    },
    {
      name: 'items',
      label: 'Itens',
      type: 'relationship',
      relationTo: [
        'publications',
        'persons',
        'researchProjects',
        'posts',
        'events',
        'organizations'
      ],
      hasMany: true,
      filterOptions: ({ relationTo, siblingData }) => {
        return (siblingData as any).collectionSlug === relationTo;
      },
      admin: {
        condition: (data, siblingData, ctx) => {
          return siblingData!.collectionSlug && !siblingData.json;
        }
      }
    },
    {
      name: 'json',
      type: 'checkbox',
      label: 'Pesquisa personalizada em JSON',
      admin: { description: 'https://payloadcms.com/docs/queries/overview' }
    },
    {
      name: 'jsonQuery',
      type: 'json',
      admin: {
        condition: (data, siblingData, ctx) => {
          return siblingData!.collectionSlug && siblingData.json;
        }
      }
    },
    {
      name: 'enableSearch',
      type: 'checkbox',
      label: 'Inserir busca e paginação',
      admin: {
        condition: (data, siblingData, ctx) => {
          return (
            [
              'persons',
              'events',
              'posts',
              'researchProjects',
              'publications'
            ].includes(siblingData!.collectionSlug) && siblingData.json
          );
        }
      }
    }
  ]
};
