/** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa");

const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  urlImports: [
    "https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "service.jahizan.com",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
