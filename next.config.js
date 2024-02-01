const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const ContentSecurityPolicy = `font-src 'self' js.stripe.com`;


const cspHeader = `
    default-src 'self';
    img-src 'https://*.stripe.com';
    script-src 'https://checkout.stripe.com';
    frame-src 'https://checkout.stripe.com';
    connect-src 'https://checkout.stripe.com';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' 'unsafe-eval';
`

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
})


console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
