/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");

const nextConfig = {
  experimental: {
    outputStandalone: true,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
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
  httpAgentOptions: {
    keepAlive: true,
    keepAliveMsecs: 100000, // 100 seconds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "service.jahizan.com",
      },
      {
        protocol: "https",
        hostname: "image.jahizan.com",
      },
      {
        protocol: "https",
        hostname: "service.raykasystem.com",
      },
      {
        protocol: "https",
        hostname: "image.raykasystem.com",
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
  reactStrictMode: false,
};

module.exports = nextConfig;
