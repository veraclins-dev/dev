import { Honeypot, SpamError } from 'remix-utils/honeypot/server';

const honeypot = new Honeypot({
  randomizeNameFieldName: false,
  nameFieldName: 'name__confirm',
  validFromFieldName: 'from__confirm', // null to disable it
  encryptionSeed: undefined,
});

async function checkHoneypot(formData: FormData) {
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

export { checkHoneypot, honeypot };
