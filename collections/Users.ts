import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  labels: { singular: 'Usuário', plural: 'Usuários' },
  slug: 'users',
  auth: true,
  fields: [{ name: 'name', label: 'Nome', type: 'text' }]
};
