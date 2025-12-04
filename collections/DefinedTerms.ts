import { CollectionConfig } from 'payload';
import { descriptionField, nameField, slugField } from './fields/commonFields';

export const DefinedTerms: CollectionConfig = {
  slug: 'definedTerms',
  labels: { singular: 'Termo', plural: 'Termos' },
  admin: { useAsTitle: 'name', description: 'Coleção de termos definidos.' },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      name: 'additionalType',
      type: 'select',
      options: [
        { label: 'Palavra-chave', value: 'keyword' },
        { label: 'Ocupação / Cargo', value: 'occupation' }
      ]
    }
  ]
};
