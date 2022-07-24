const SEO: import('next-seo').DefaultSeoProps = {
    defaultTitle: "Zachary's Portfolio",
    titleTemplate: "%s | Zachary's Portfolio",
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.SITE_URL || "",
        site_name: "Zachary's Portfolio",
        profile: {
            firstName: 'Zachary',
            lastName: 'Collins'
        },
        images: [
            {
                url: "/assets/images/portfolioScreenshot1.webp",
                width: 1200,
                height: 630,
                alt: 'Portfolio Site Screenshot',
                type: 'image/webp'
            },
            {
                url: "/assets/images/portfolioScreenshot1.jpg",
                width: 1200,
                height: 630,
                alt: 'Portfolio Site Screenshot',
                type: 'image/jpeg'
            },
            {
                url: "/assets/images/portfolioScreenshot1.png",
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
    }
}
export default SEO;