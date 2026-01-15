import { Block, Field } from 'payload';
import { imageField, urlField } from '../commonFields';
import { LUCIDE_ICONS } from '@/lib/lucide-icons';
import { array } from 'payload/shared';

export const richTextBlock: Block = {
  labels: { singular: 'Editor de Texto', plural: 'Editor de Texto' },
  slug: 'richTextBlock',
  fields: [{ name: 'body', type: 'richText', label: 'Conteúdo' }]
};
