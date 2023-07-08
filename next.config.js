/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ hostname: "images.punkapi.com" }] },
};

module.exports = nextConfig;
