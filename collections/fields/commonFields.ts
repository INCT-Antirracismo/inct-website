import { Field, slugField as payloadSlugField } from 'payload';

export const nameField: Field = {
  label: 'Nome',
  name: 'name',
  required: true,
  type: 'text'
};

export const slugField: Field = payloadSlugField({ fieldToUse: 'name' });

export const descriptionField: Field = {
  name: 'description',
  label: 'Descrição',
  type: 'textarea'
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
