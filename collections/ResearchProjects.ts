import { CollectionConfig } from 'payload';
import {
  descriptionField,
  nameField,
  slugField,
  urlField
} from './fields/commonFields';

export const ResearchProjects: CollectionConfig = {
  slug: 'researchProjects',
  labels: { singular: 'Organização', plural: 'Organizações' },
  admin: {
    useAsTitle: 'name',
    description:
      'Instituições ou organizações como universidades, grupos de pesquisa, instituições de fomento, etc.'
  },
  fields: [
    slugField,
    nameField,
    {
      name: 'acronym',
      label: 'Sigla / Abreviação',
      type: 'text',
      admin: { description: 'Abreviação para o nome da organização. Ex.: CNPq' }
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    descriptionField,
    urlField
  ]
};
