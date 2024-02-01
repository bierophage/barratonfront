const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const ContentSecurityPolicy = `font-src 'self' js.stripe.com`;


const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' 'https://checkout.stripe.com';
    style-src 'self' 'unsafe-inline';
    img-src 'self' 'https://*.stripe.com';
    frame-src 'https://checkout.stripe.com';
`

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
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
