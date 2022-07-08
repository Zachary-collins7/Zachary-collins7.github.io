// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? 'd1b6q6iv3yqcky.cloudfront.net' : '',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
    additionalData: `@import "app/styles/abstracts/variables.scss"; @import "app/styles/abstracts/mixins.scss";`,
  },
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
