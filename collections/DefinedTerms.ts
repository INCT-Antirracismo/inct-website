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
    description:
      'Coleção de termos definidos para uso no cadastro de conteúdos no site. É uma forma de definir, por exemplo, a lista de Tags disponíveis para uma notícia, ou os possíveis vínculos de uma pessoa com uma Organização.',
    group: 'Configuração',
    defaultColumns: ['name', 'additionalType', 'description']
  },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      label: 'Categoria do Termo',
      name: 'additionalType',
      type: 'select',
      options: [
        { label: 'Palavra-chave', value: 'keyword' },
        { label: 'Ocupação / Cargo', value: 'occupation' },
        { label: 'Tipo de Organização', value: 'organizationType' },
        { label: 'Tipo de Publicação', value: 'publicationType' },
        { label: 'Tipo de Projeto', value: 'researchProjectType' },
        { label: 'Situação', value: 'status' },
        { label: 'Núcleo do INCT', value: 'inctGroup' },
        { label: 'Tag', value: 'tag' }
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
