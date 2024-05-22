/** @type {import('next').NextConfig} */
const {
  withSentryConfig,
  instrumentOutgoingRequests,
} = require("@sentry/nextjs");

// const withPWA = require("next-pwa");

const nextConfig = {
  experimental: {
    outputStandalone: true,
    instrumentationHook: true,
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

module.exports = withSentryConfig(nextConfig, {
  org: "jahizan",
  project: "jahizan",
  authToken:
    "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",
  silent: false, // Can be used to suppress logs
  telemetry: false,
  sourcemaps: {
    disable: true,
  },
});
