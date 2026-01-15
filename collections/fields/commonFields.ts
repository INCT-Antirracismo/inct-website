import { Field, slugField as payloadSlugField } from 'payload';

export const nameField: Field = {
  label: 'Nome',
  name: 'name',
  required: true,
  type: 'text'
};

const psf = payloadSlugField({ fieldToUse: 'name' });

export const slugField: Field = {
  ...psf,
  admin: {
    ...psf.admin,
    description:
      'A slug é uma versão do "Nome" somente em letras minúsculas e sem caracteres especiais. Ela é usada como  identificador único do conteúdo legível para humanos, principalmente para a construção de URLs.'
  }
} as Field;

export const descriptionField: Field = {
  name: 'description',
  label: 'Descrição curta',
  type: 'textarea',
  maxLength: 320,
  admin: {
    description: 'Adicione uma descrição curta do item.',
    components: {
      Field: '@/components/payload/ui/MaxLengthTextArea#MaxLengthTextAreaField'
    },
    rows: 3
  }
};

export const imageField: Field = {
  name: 'image',
  label: 'Imagem',
  type: 'upload',
  relationTo: 'media',
  admin: {
    components: {
      Cell: '@/components/payload/ui/AvatarCell#AvatarCellField'
    }
  }
};

export const urlField: Field = {
  name: 'url',
  label: 'Site / Link',
  type: 'text',
  validate: (value: any) => {
    let url;
    const errorMsg = 'Digite um URL válido.';
    try {
      url = new URL(value);
    } catch (_) {
      return errorMsg;
    }

    return (
      Boolean(url.protocol === 'http:' || url.protocol === 'https:') || errorMsg
    );
  }
};

export const socialMediaField: Field = {
  label: 'Redes Sociais',
  labels: { singular: 'Rede Social', plural: 'Redes Sociais' },
  name: 'socialMedia',
  type: 'array',
  fields: [
    { ...urlField, label: 'URL' },
    {
      name: 'type',
      label: 'Rede',
      type: 'select',
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: 'Youtube', value: 'youtube' },
        { label: 'Site Pessoal', value: 'personalWebsite' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Linkedin', value: 'linkedin' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'Substack', value: 'substack' },
        { label: 'Twitter / X', value: 'twitter' },
        { label: 'Bluesky', value: 'bluesky' }
      ]
    }
  ]
};

export const linkField: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'linkType',
      label: 'Tipo de link',
      type: 'select',
      options: [
        { value: 'external', label: 'Link Externo' },
        { value: 'internal', label: 'Link Interno' }
      ],
      defaultValue: 'external'
    },
    {
      ...urlField,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (siblingData.linkType === 'external') {
            return true;
          }
          return false;
        }
      },
      required: true
    } as Field,
    {
      name: 'internalContent',
      label: 'Conteúdo Interno',
      type: 'relationship',
      relationTo: [
        'persons',
        'posts',
        'pages',
        'researchProjects',
        'events',
        'organizations'
      ],
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (siblingData.linkType === 'internal') {
            return true;
          }
          return false;
        }
      },
      required: true
    },
    {
      name: 'targetBlank',
      type: 'checkbox',
      label: 'Abrir em uma nova guia',
      defaultValue: true
    }
  ]
};

export const locationField: Field = {
  label: 'Localização',
  name: 'geo',
  type: 'point',

  admin: {
    components: {
      Field: '@/components/payload/ui/location#LocationField'
    },
    description:
      'Você provavelmente não quer mexer nos campos de latitude e longitude...'
  }
};
