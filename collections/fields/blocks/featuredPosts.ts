import { Block } from 'payload';

export const featuredPosts: Block = {
  labels: { singular: 'Posts em destaque', plural: 'Posts em destaque' },
  slug: 'featuredPosts',
  fields: [
    {
      name: 'featured',
      label: 'Post em destaque',
      type: 'relationship',
      relationTo: ['posts'],
      hasMany: false,
      admin: {
        description:
          'Escolha uma notícia para ficar destacada. Caso não escolha nenhuma, a posição será ocupada pela primeira notícia escolhida entre as opções ou query abaixo.'
      }
    },
    {
      name: 'items',
      label: 'Itens',
      type: 'relationship',
      relationTo: ['posts'],
      hasMany: true,
      admin: {
        condition: (data, siblingData, ctx) => {
          return !siblingData.json;
        }
      },
      minRows: 2,
      maxRows: 5
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
          return siblingData.json;
        }
      }
    }
  ]
};
