import { CollectionConfig } from 'payload';
import { descriptionField, nameField, slugField } from './fields/commonFields';
import { isAdmin, isEditor } from '@/app/access';

export const DefinedTerms: CollectionConfig = {
  slug: 'definedTerms',
  labels: { singular: 'Termo', plural: 'Dicionário de Termos' },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isEditor,
    update: isAdmin
  },
  admin: {
    useAsTitle: 'name',
    description: 'Coleção de termos definidos.',
    group: 'Configuração',
    defaultColumns: ['name', 'additionalType', 'description']
  },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      label: 'Categoria do termo',
      name: 'additionalType',
      type: 'select',
      options: [
        { label: 'Palavra-chave', value: 'keyword' },
        { label: 'Ocupação / Cargo', value: 'occupation' },
        { label: 'Tipo de organização', value: 'organizationType' }
      ],
      required: true,
      admin: {
        components: {
          Cell: '@/components/payload/ui/TagCell#TagCell'
        }
      }
    }
  ]
};
