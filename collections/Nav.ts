import { authenticated, isEditor } from '@/app/access';
import { GlobalConfig } from 'payload';

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Menu Principal',
  admin: { group: 'Website' },
  access: {
    read: authenticated,
    update: isEditor
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 8,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'persons', // "pages" is the slug of an existing collection
          required: true
        }
      ]
    }
  ]
};
