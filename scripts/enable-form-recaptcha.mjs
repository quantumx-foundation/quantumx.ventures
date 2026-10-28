// Runs after `next build`. When a reCAPTCHA key is configured, marks the static
// Netlify form definitions in out/__forms.html as reCAPTCHA-protected, matching
// the React forms (see lib/recaptcha.ts). Without a key it leaves them alone:
// Netlify would otherwise demand a token the forms never send.
import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../out/__forms.html', import.meta.url);

if (!process.env.SITE_RECAPTCHA_KEY) {
  console.log('SITE_RECAPTCHA_KEY not set: forms use the honeypot only.');
} else {
  const html = await readFile(file, 'utf8');
  const marked = html.replaceAll('data-netlify="true"', 'data-netlify="true" data-netlify-recaptcha="true"');
  const count = marked.split('data-netlify-recaptcha').length - 1;
  if (count !== 3) throw new Error(`Expected 3 forms in __forms.html, found ${count}.`);
  await writeFile(file, marked);
  console.log('reCAPTCHA enabled on 3 Netlify forms.');
}
