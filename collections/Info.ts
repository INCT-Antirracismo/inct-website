import { Field, GlobalConfig } from 'payload';
import { imageField, nameField } from './fields/commonFields';
import { authenticated, isEditor } from '@/app/access';

export const Info: GlobalConfig = {
  slug: 'info',
  label: 'Informações Gerais',
  admin: { group: 'Website' },
  access: {
    read: authenticated,
    update: isEditor
  },
  fields: [nameField, { ...imageField, name: 'logo', label: 'Logo' } as Field]
};
