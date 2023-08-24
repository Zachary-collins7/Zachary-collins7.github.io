// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')],
    additionalData: `@import "app/styles/abstracts/variables.scss"; @import "app/styles/abstracts/mixins.scss";`,
  },
  output: "export",
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
