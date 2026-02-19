'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TextareaField, useField } from '@payloadcms/ui';
import { AlertCircleIcon } from 'lucide-react';
import type { TextareaFieldClientComponent } from 'payload';

export const MaxLengthTextAreaField: TextareaFieldClientComponent = (props) => {
  const { field, path } = props;
  const { value, setValue } = useField({ path });

  return (
    <>
      <TextareaField {...props} />

      {(value as string)?.length > 156 && (
        <Alert
          variant="destructive"
          className="max-w-md *:text-[oklch(57.7%_0.245_27.325)]! border-[oklch(57.7%_0.245_27.325)] -mt-2 mb-5"
        >
          <AlertCircleIcon />
          <AlertTitle>
            A descrição está longa demais ({(value as string).length}/156)
          </AlertTitle>
          <AlertDescription className="">
            O tamanho ideal para este campo é de até 156 caracteres. Quando o
            texto ultrapassa disso, como é o caso, ele irá aparecer cortado em
            algumas telas.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
