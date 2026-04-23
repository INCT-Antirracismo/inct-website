'use client';
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';

import { useRouter } from 'next/navigation';
import React, { RefObject, useCallback, useRef, useState } from 'react';
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
import { submitForm } from '@/lib/submitForm';
import { Turnstile } from 'next-turnstile';

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
  const [turnstileStatus, setTurnstileStatus] = useState<
    'success' | 'error' | 'expired' | 'required'
  >('required');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (data: Data) => {
    let loadingTimerID: ReturnType<typeof setTimeout>;
    const submit = async () => {
      if (turnstileStatus !== 'success') {
        setError({ message: 'Please verify you are not a robot' });
        setIsLoading(false);
        return;
      }

      const formData = formRef.current ? new FormData(formRef.current) : null;
      const token = formData!.get('cf-turnstile-response');

      console.log(token);

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
        const res = await submitForm({
          dataToSend,
          formID,
          token
        });

        console.log(res);
        clearTimeout(loadingTimerID);

        if (res.status >= 400) {
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

    void submit();
  };

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
            <form ref={formRef} id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                retry="auto"
                refreshExpired="auto"
                sandbox={process.env.NODE_ENV === 'development'}
                onError={() => {
                  setTurnstileStatus('error');
                  //setError("Security check failed. Please try again.");
                }}
                onExpire={() => {
                  setTurnstileStatus('expired');
                  //setError("Security check expired. Please verify again.");
                }}
                onLoad={() => {
                  setTurnstileStatus('required');
                }}
                onVerify={(token) => {
                  setTurnstileStatus('success');
                }}
              />
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
