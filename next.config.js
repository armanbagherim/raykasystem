/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nest-jahizan.chbk.run",
      },
    ],
  },
};

module.exports = nextConfig;
