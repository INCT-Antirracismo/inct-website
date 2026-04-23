import type { SelectField } from '@payloadcms/plugin-form-builder/types';
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form';

import React from 'react';
import { Controller } from 'react-hook-form';

import { Error } from '../Error';
import { Width } from '../Width';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select as SelectUIField,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export const Select: React.FC<
  {
    control: Control<FieldValues, any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  } & SelectField
> = ({ name, control, errors, label, options, required, width }) => {
  return (
    <Width width={width}>
      <Field>
        <FieldLabel htmlFor={name}>{label}sss</FieldLabel>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field: { onChange, value } }) => (
            <SelectUIField
              onValueChange={(val: any) =>
                onChange(val ? (val.value as any) : '')
              }
              value={options.find((s) => s.value === value) as any}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  {options.map((option) => {
                    return (
                      <SelectItem
                        value={option.value}
                        key={option.value + '_option'}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </SelectUIField>
          )}
          rules={{ required }}
        />
        {required && errors[name] && <Error />}
      </Field>
    </Width>
  );
};
