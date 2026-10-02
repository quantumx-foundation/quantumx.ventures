# QuantumX Ventures

Website for QuantumX Ventures, the venture studio of QuantumX Foundation.
Next.js 14 (App Router), TypeScript and Tailwind CSS, exported as a static site
for Netlify.

## Commands

```bash
npm install
npm run dev        # local development on http://localhost:3000
npm run typecheck
npm run lint
npm run build      # static export to out/
```

## Editing content

All copy lives in typed data files in `content/`:

| File | What it controls |
| --- | --- |
| `site.ts` | Name, URL, contact email, socials, navigation |
| `studio.ts` | Studio intro, studio vs fund, capabilities, process, audiences |
| `thesis.ts` | Areas of interest and venture criteria |
| `ventures.ts` | Portfolio. Empty until ventures are confirmed (shows an "in formation" state) |
| `people.ts` | Team members |
| `ecosystem.ts` | QuantumX pillars, shipped technology, launch milestone |
| `insights.ts` | Articles (link out to the QuantumX Foundation blog) |

Images live in `public/images/` as pre-compressed WebP. The static export has
no image optimisation server, so resize and compress new images before adding
them.

## Forms

Forms are handled by Netlify Forms and are registered from the static copies in
`public/__forms.html`:

- `venture-inquiry`: the contact form on `/contact/`.
- `waitlist`: the footer updates sign-up. Same form name as the original
  waitlist page, so existing submissions stay in one place.

Forms only submit on a Netlify deployment. Elsewhere they show an error with
the contact email instead of a false success. Enable form notifications in the
Netlify dashboard so submissions reach an inbox.

## Deployment

`netlify.toml` builds with `npm run build` and publishes `out/`.
