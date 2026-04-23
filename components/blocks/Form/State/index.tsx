import type { StateField } from '@payloadcms/plugin-form-builder/types';
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form';

import React from 'react';
import { Controller } from 'react-hook-form';

import { Error } from '../Error';
import { Width } from '../Width';
import { stateOptions } from './options';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select';

export const State: React.FC<
  {
    control: Control<FieldValues, any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  } & StateField
> = ({ name, control, errors, label, required, width }) => {
  return (
    <Width width={width}>
      <Field>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field: { onChange, value } }) => (
            <Select
              onValueChange={(val: any) =>
                onChange(val ? (val.value as any) : '')
              }
              value={stateOptions.find((s) => s.value === value) as any}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  {stateOptions.map((option) => {
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
            </Select>
          )}
          rules={{ required }}
        />
        {required && errors[name] && <Error />}
      </Field>
    </Width>
  );
};
