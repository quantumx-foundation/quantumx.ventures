/**
 * Submits a form to Netlify Forms.
 *
 * Netlify registers forms at deploy time from the static copies in
 * public/__forms.html. The rendered React forms post here with the matching
 * `form-name`. Outside a Netlify deployment (for example `next dev`) the POST
 * fails, and callers show an error with the email fallback instead of
 * pretending the message was sent.
 */
export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const data = new FormData(form);
  const body = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === 'string') body.append(key, value);
  });

  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed with HTTP ${response.status}`);
  }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
