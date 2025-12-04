import type { CollectionConfig } from 'payload';
import { nameField } from './fields/commonFields';

export const Places: CollectionConfig = {
  slug: 'places',
  labels: { singular: 'Lugar', plural: 'Lugares' },
  fields: [
    nameField,
    {
      type: 'row',
      fields: [
        {
          label: 'Localização',
          name: 'geo',
          required: true,
          type: 'point',
          admin: {
            components: {
              Field: '@/components/payload/ui/location#LocationField'
            },
            description:
              'Você provavelmente não quer mexer nos campos de latitude e longitude...'
          },
          hooks: {
            beforeChange: [
              ({ value, operation }) => {
                console.log(value);
                return [0, 0];
              }
            ]
          }
        },
        { label: 'Endereço', name: 'address', required: true, type: 'text' }
      ]
    }
  ]
};
