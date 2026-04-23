import type { Block } from 'payload';

export const formBlock: Block = {
  slug: 'formBlock',
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      required: true
    },
    {
      name: 'form',
      label: 'Formulário',
      type: 'relationship',
      relationTo: 'forms',
      required: true
    }
  ],
  labels: {
    plural: 'Formulários',
    singular: 'Formulário'
  }
};
