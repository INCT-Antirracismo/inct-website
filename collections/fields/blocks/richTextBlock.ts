import { Block } from 'payload';
import { richTextField } from '../commonFields';

export const richTextBlock: Block = {
  labels: { singular: 'Editor de Texto', plural: 'Editor de Texto' },
  slug: 'richTextBlock',
  fields: [
    {
      name: 'centered',
      type: 'checkbox',
      label: 'Centralizar conteúdo',
      defaultValue: true
    },
    richTextField
  ]
};
