import { Block, Field } from 'payload';
import {
  buttonsField,
  descriptionField,
  imageField,
  nameField,
  urlField
} from '../commonFields';
import { LUCIDE_ICONS } from '@/lib/lucide-icons';
import { array } from 'payload/shared';

export const contentList: Block = {
  labels: { singular: 'Lista de conteúdo', plural: 'Lista de conteúdo' },
  slug: 'contentList',
  fields: [
    { ...nameField, required: false } as Field,
    descriptionField,
    buttonsField,
    {
      name: 'collectionSlug',
      type: 'select',
      options: [
        'publications',
        'persons',
        'researchProjects',
        'posts',
        'pages',
        'events',
        'organizations'
      ]
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: [
        'publications',
        'persons',
        'researchProjects',
        'posts',
        'pages',
        'events',
        'organizations'
      ],
      hasMany: true,
      filterOptions: ({ relationTo, siblingData }) => {
        return (siblingData as any).collectionSlug === relationTo;
      },
      admin: {
        condition: (data, siblingData, ctx) => {
          return siblingData!.collectionSlug;
        }
      }
    }
  ]
};
