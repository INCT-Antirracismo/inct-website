import type { CollectionConfig } from 'payload';
import { nameField } from './fields/commonFields';
import { isAdmin, isEditor } from '@/app/access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isEditor,
    update: isAdmin
  },
  auth: {
    tokenExpiration: 60 * 60 * 2, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 60 * 2 // 2 hours
  },
  admin: { useAsTitle: 'name', group: 'Configuração' },
  fields: [
    nameField,
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Autor', value: 'author' }
      ],
      required: true
    }
  ]
};
