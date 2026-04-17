import { Block } from 'payload';

export const cardsBlock: Block = {
  slug: 'cardsBlock',
  labels: { plural: 'Cards', singular: 'Cards' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Itens',
      fields: [
        {
          name: 'title',
          label: 'Título',
          type: 'text'
        },
        { name: 'content', type: 'richText', label: 'Conteúdo' }
      ]
    }
  ]
};
