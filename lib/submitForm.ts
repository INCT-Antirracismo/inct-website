'use server';

import { validateTurnstileToken } from 'next-turnstile';
import { v4 } from 'uuid';

export const submitForm = async ({ dataToSend, formID, token }: any) => {
  const validationResponse = await validateTurnstileToken({
    token,
    secretKey: process.env.TURNSTILE_SECRET_KEY!,
    // Optional: Add an idempotency key to prevent token reuse
    idempotencyKey: v4(),
    sandbox: process.env.NODE_ENV === 'development'
  });

  if (!validationResponse.success) {
    return { message: 'Invalid token', status: 400 };
  }

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
  return res;
};
