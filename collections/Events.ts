import { CollectionConfig } from 'payload';
import { descriptionField, nameField, slugField } from './fields/commonFields';
import { authenticated, authenticatedOrPublished } from '@/app/access';

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Evento', plural: 'Eventos' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    group: 'Website'
  },
  fields: [nameField, slugField, descriptionField]
};
