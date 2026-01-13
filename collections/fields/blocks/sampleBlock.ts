import { Block, Field } from 'payload';
import { imageField, urlField } from '../commonFields';
import { LUCIDE_ICONS } from '@/lib/lucide-icons';
import { array } from 'payload/shared';

export const sampleBlock: Block = {
  labels: { singular: 'Sample', plural: 'Sample' },
  slug: 'sampleBlock',
  fields: [{ name: 'title', type: 'text' }]
};
