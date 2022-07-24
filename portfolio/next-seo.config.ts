const fallBackSiteUrl = 'http://zachary-collins7.github.io'
const siteUrl = process.env.SITE_URL || fallBackSiteUrl

const SEO: import('next-seo').DefaultSeoProps = {
    defaultTitle: "Zachary's Portfolio",
    titleTemplate: "%s | Zachary's Portfolio",
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        site_name: "Zachary's Portfolio",
        profile: {
            firstName: 'Zachary',
            lastName: 'Collins'
        },
        images: [
            {
                url: siteUrl + '/assets/images/portfolioScreenshot1.webp',
                width: 1200,
                height: 630,
                alt: 'Portfolio Site Screenshot',
                type: 'image/webp'
            },
            {
                url: siteUrl + '/assets/images/portfolioScreenshot1.jpg',
                width: 1200,
                height: 630,
                alt: 'Portfolio Site Screenshot',
                type: 'image/jpeg'
            },
            {
                url: siteUrl + '/assets/images/portfolioScreenshot1.png',
                width: 1200,
                height: 630,
                alt: 'Portfolio Site Screenshot',
                type: 'image/png'
            }
        ]
    },
    twitter: {
        cardType: 'summary_large_image',
        site: '@ZachTheCollins',
        handle: '@ZachTheCollins'   
    },
    facebook: {
        appId: '5348420825250671',
    }
}
export default SEO;