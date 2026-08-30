/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com', 'tebinnovations.in'],
    unoptimized: true,
  },
};

export default nextConfig;
