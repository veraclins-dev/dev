import { Honeypot, SpamError } from 'remix-utils/honeypot/server';

export const honeypot = new Honeypot({
  randomizeNameFieldName: false,
  nameFieldName: 'name__confirm',
  validFromFieldName: 'from__confirm', // null to disable it
  encryptionSeed: undefined,
});

export async function checkHoneypot(formData: FormData) {
  try {
    await honeypot.check(formData);
  } catch (error) {
    console.error(error);
    if (error instanceof SpamError) {
      throw new Response('Form not submitted properly', { status: 400 });
    }
    throw error;
  }
}
