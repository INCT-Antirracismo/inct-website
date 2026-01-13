import { GlobalConfig } from 'payload';
import { nameField } from './fields/commonFields';
import { authenticated, isEditor } from '@/app/access';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Rodapé',
  admin: { group: 'Website' },
  access: {
    read: authenticated,
    update: isEditor
  },
  fields: [nameField]
};
