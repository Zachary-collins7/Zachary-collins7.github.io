const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
        additionalData: `@import "src/styles/abstracts/_variables.scss"; @import "src/styles/abstracts/_mixins.scss";`,
      },
      experimental: {
        images: {
          unoptimized: true
        }
      }
}

module.exports = nextConfig