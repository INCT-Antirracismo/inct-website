'use client';
import React from 'react';
import { TextareaField } from '@payloadcms/ui';
import type { TextareaFieldClientComponent } from 'payload';

export const MaxLengthTextAreaField: TextareaFieldClientComponent = (props) => {
  // console.log(props);
  return (
    <>
      <TextareaField {...props} />
    </>
  );
};
