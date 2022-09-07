/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "pl-PL", "fr-FR", "vi-VN"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["developer-sandbox.eu.saleor.cloud"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/checkout",
        destination: `${process.env.NEXT_PUBLIC_CHECKOUT_URL}`,
      },
      {
        source: "/saleor-app-checkout",
        destination: `${process.env.NEXT_PUBLIC_CHECKOUT_APP_URL}`,
      },
      {
        source: "/saleor-app-checkout/:path*",
        destination: `${process.env.NEXT_PUBLIC_CHECKOUT_APP_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
