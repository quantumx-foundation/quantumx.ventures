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
};

export default nextConfig;
