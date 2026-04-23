'use client';
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { buildInitialFormState } from './buildInitialFormState';
import { fields } from './fields';
import { CustomRichText } from '@/components/blocks/RichTextConverter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[] | Value;
}

export type FormBlockType = {
  blockName?: string;
  blockType?: 'formBlock';
  title: string;
  form: FormType;
  description: string;
};

export const FormBlock: React.FC<
  FormBlockType & {
    id?: string;
  }
> = (props) => {
  const {
    title,
    description,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel
    } = {}
  } = props;

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields) as any
  });
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;
      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value
        }));

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          console.log(dataToSend);
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/form-submissions`,
            {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }
          );

          const res = await req.json();

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect;

            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: 'Something went wrong.'
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType]
  );

  return (
    <section className="w-full flex justify-center px-4 my-12">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-balance">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <CustomRichText lexicalData={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Carregando, aguarde...</p>}
          {error && (
            <div>{`${error.status || '500'}: ${error.message || ''}`}</div>
          )}
          {!hasSubmitted && (
            // @ts-ignore
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields.map((field, index) => {
                    // @ts-ignore
                    const Field: React.FC<any> = fields?.[field.blockType];
                    if (Field) {
                      return (
                        <React.Fragment key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
              </div>
              <Button form={formID} className="w-full mt-4">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
