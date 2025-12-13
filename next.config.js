/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  // Ensures trailing slashes are consistent
  trailingSlash: false,
}

module.exports = nextConfig
