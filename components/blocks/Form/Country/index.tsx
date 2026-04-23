import type { CountryField } from '@payloadcms/plugin-form-builder/types';
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form';

import React from 'react';
import { Controller } from 'react-hook-form';

import { Error } from '../Error';
import { Width } from '../Width';
import { countryOptions } from './options';

export const Country: React.FC<
  {
    control: Control<FieldValues, any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  } & CountryField
> = ({ name, control, errors, label, required, width }) => {
  return null;
};
