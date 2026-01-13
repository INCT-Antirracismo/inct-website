import { Block, Field } from 'payload';
import { imageField, linkField, urlField } from '../commonFields';
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
          name: 'fullScreen',
          type: 'checkbox',
          label: 'Usar altura total da tela?'
        },
        {
          name: 'variant',
          label: 'Estilo',
          type: 'select',
          options: [
            { label: 'Padrão', value: 'light' },
            { label: 'Escuro', value: 'dark' }
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

    {
      name: 'buttons',
      label: 'Botão',
      labels: { singular: 'Botão', plural: 'Botões' },
      type: 'array',
      fields: [
        { name: 'label', label: 'Texto', type: 'text' },
        {
          name: 'iconSlug',
          label: 'Ícone',
          type: 'select',
          options: LUCIDE_ICONS as any,
          admin: {
            description: 'Adicone um ícone https://lucide.dev/icons/'
          }
        },
        {
          name: 'iconPosition',
          label: 'Posição do Ícone',
          type: 'radio',
          options: [
            { label: 'À Direita', value: 'right' },
            { label: 'À Esquerda', value: 'left' }
          ],
          defaultValue: 'left'
        },
        {
          name: 'variant',
          label: 'Variante',
          type: 'select',
          options: [
            { value: 'default', label: 'Padrão' },
            { value: 'secondary', label: 'Secundário' },
            { value: 'outline', label: 'Contorno' },
            { value: 'ghost', label: 'Fantasma' },
            { value: 'link', label: 'Link' }
          ],
          defaultValue: 'default'
        },
        linkField
      ]
    }
  ]
};
