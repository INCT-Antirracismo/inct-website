import type { TextField } from '@payloadcms/plugin-form-builder/types';
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea as TextAreaUI } from '@/components/ui/textarea';

export const Textarea: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<any & FieldValues>;
    rows?: number;
  } & TextField
> = ({
  name,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width
}) => {
  return (
    <Width width={width}>
      <Field>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <TextAreaUI
          id={name}
          rows={rows}
          {...register(name, { required: requiredFromProps })}
        />
        {requiredFromProps && errors[name] && <Error />}
      </Field>
    </Width>
  );
};
