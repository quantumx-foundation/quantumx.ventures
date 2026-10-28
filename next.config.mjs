/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export, deployed to Netlify (same hosting as the original waitlist).
  // Netlify Forms handle the contact and updates forms, so no server is needed.
  output: 'export',
  // The static export has no image optimisation server. Source images in
  // public/images are pre-compressed WebP sized for their largest use.
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
  // Netlify's reCAPTCHA variable, exposed to the browser under a neutral name.
  // The secret (SITE_RECAPTCHA_SECRET) stays in Netlify and never reaches the build output.
  env: { RECAPTCHA_SITE_KEY: process.env.SITE_RECAPTCHA_KEY ?? '' },
};

export default nextConfig;
