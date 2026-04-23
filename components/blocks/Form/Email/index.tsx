import type { EmailField } from '@payloadcms/plugin-form-builder/types';
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const Email: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<any & FieldValues>;
  } & EmailField
> = ({ name, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <Field>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Input
          id={name}
          type="email"
          {...register(name, { required: requiredFromProps })}
        />
        {requiredFromProps && errors[name] && <Error />}
      </Field>
    </Width>
  );
};
