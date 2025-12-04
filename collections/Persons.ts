import { CollectionConfig, Field } from 'payload';
import {
  descriptionField,
  nameField,
  slugField,
  urlField
} from './fields/commonFields';

export const Persons: CollectionConfig = {
  slug: 'persons',
  labels: { singular: 'Pessoa', plural: 'Pessoas' },
  admin: {
    useAsTitle: 'name',
    description: 'Professores, alunos, palestrantes, etc.'
  },
  fields: [
    slugField,
    nameField,
    {
      name: 'pronouns',
      label: 'Pronomes',
      type: 'select',
      options: ['Masculino', 'Feminino', 'Neutro']
    },
    {
      ...descriptionField,
      admin: { description: 'Bio curta da pessoa.' }
    } as Field,
    { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media' },
    { name: 'email', type: 'email', label: 'E-mail' },
    { ...urlField, label: 'URL do Lattes' } as Field,
    {
      name: 'memberOf',
      label: 'Filiação',
      type: 'relationship',
      relationTo: 'organizations',
      admin: { description: 'Instituição à qual a pessoa é vinculada.' }
    }
    // {
    //   name: 'relations',
    //   labels: { singular: 'Vínculos', plural: 'Vínculos' },
    //   type: 'array',
    //   fields: [
    //     {
    //       name: 'relationType',
    //       label: 'Natureza da relação',
    //       type: 'relationship',
    //       relationTo: 'definedTerms',
    //       filterOptions: { additionalType: { in: ['occupation'] } }
    //     },
    //     {
    //       name: 'relationTo',
    //       type: 'relationship',
    //       relationTo: ['organizations']
    //     }
    //   ]
    // }
  ]
};

//
