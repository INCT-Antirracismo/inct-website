import { Block, Field } from 'payload';
import { buttonsField, imageField, linkField, urlField } from '../commonFields';
import { LUCIDE_ICONS } from '@/lib/lucide-icons';
import { array } from 'payload/shared';

export const defaultCTABlock: Block = {
  labels: { singular: 'Call-To-Action Padrão', plural: 'CTAs Padrão' },
  slug: 'defaultCTABlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          label: 'Posição da Imagem',
          type: 'select',
          options: [
            { label: 'Sem Imagem', value: 'none' },
            { label: 'Direita', value: 'right' },
            { label: 'Esquerda', value: 'left' },
            { label: 'Pano de Fundo', value: 'background' }
          ],
          defaultValue: 'none'
        },
        {
          name: 'height',
          label: 'Altura (mínima)',
          type: 'select',
          options: [
            { label: 'Automática', value: 'auto' },
            { label: 'Full Screen', value: 'full' },
            { label: '80% da tela', value: '80' }
          ],
          defaultValue: 'auto'
        },
        {
          name: 'variant',
          label: 'Estilo',
          type: 'select',
          options: [
            { label: 'Claro', value: 'light' },
            { label: 'Laranja', value: 'dark' },
            { label: 'Amarelo', value: 'sun' }
          ],
          defaultValue: 'light',
          admin: {
            condition: (data, siblingData, { blockData, path, user }) => {
              // Não exibir se imagePosition for 'none'
              return siblingData.imagePosition !== 'background';
            }
          }
        }
      ]
    },
    { name: 'centered', type: 'checkbox', label: 'Centralizar conteúdo' },
    {
      ...imageField,
      admin: {
        ...imageField.admin,
        condition: (data, siblingData, { blockData, path, user }) => {
          // Não exibir se imagePosition for 'none'
          return siblingData.imagePosition !== 'none';
        }
      },
      required: true
    } as Field,

    { name: 'title', label: 'Título', type: 'text', required: true },
    {
      name: 'subtitle',
      label: 'Subtítulo',
      type: 'textarea',
      admin: { rows: 3 }
    },
    { name: 'label', label: 'Chapéu', type: 'text' },
    { name: 'content', label: 'Texto', type: 'richText' },
    buttonsField
  ]
};
