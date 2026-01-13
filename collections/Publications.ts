import { CollectionConfig } from 'payload';
import { descriptionField, nameField, slugField } from './fields/commonFields';
import {
  authenticated,
  authenticatedOrPublished,
  isEditor
} from '@/app/access';

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publicação', plural: 'Publicações' },
  access: {
    create: authenticated,
    delete: isEditor,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    description: 'Coleção de termos definidos.',
    group: 'Institucional'
  },
  fields: [nameField, slugField, descriptionField]
};
