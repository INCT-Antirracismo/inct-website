import type { MessageField } from '@payloadcms/plugin-form-builder/types';

import React from 'react';

import { Width } from '../Width';
import { CustomRichText } from '@/components/blocks/RichTextConverter';

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <CustomRichText lexicalData={message as any} />
    </Width>
  );
};
