import {
  authenticated,
  authenticatedOrPublished,
  isEditor
} from '@/app/access';
import { CollectionConfig, Field } from 'payload';
import {
  descriptionField,
  imageField,
  locationField,
  nameField,
  slugField,
  urlField
} from './fields/commonFields';

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  labels: { singular: 'Organização', plural: 'Organizações' },
  access: {
    create: authenticated,
    delete: isEditor,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    useAsTitle: 'name',
    description:
      'Instituições ou organizações como universidades, grupos de pesquisa, instituições de fomento, etc.',
    group: 'Institucional'
  },
  fields: [
    slugField,
    {
      ...nameField,
      admin: {
        description:
          'O nome completo da organização. Ex.: Conselho Nacional de Desenvolvimento Científico e Tecnológico'
      }
    } as Field,
    {
      name: 'acronym',
      label: 'Sigla / Abreviação',
      type: 'text',
      admin: { description: 'Abreviação para o nome da organização. Ex.: CNPq' }
    },
    descriptionField,
    {
      name: 'type',
      label: 'Tipo de organização',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['organizationType'] } },
      required: true,
      admin: { description: 'Do que se trata essa organização? ' }
    },
    {
      ...imageField,
      label: 'Logo',
      name: 'logo',
      admin: {
        ...imageField.admin,
        description:
          'Sempre arquivos .png sem fundo ou então versões com fundo branco.'
      }
    } as Field,
    urlField,
    {
      name: 'memberOf',
      label: 'Faz parte de:',
      admin: {
        description:
          'Utilize esse campo caso a organização seja parte de uma instituição maior, como ao adicionar um departamento de uma faculdade. Uma faculdade, por sua vez, pode ser parte de uma universidade.'
      },
      type: 'relationship',
      relationTo: 'organizations'
    },
    { label: 'Endereço', name: 'address', type: 'text' },
    locationField
  ]
};
