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
                url: process.env.SITE_URL || "" + "/assets/images/portfolioScreenshot1.webp",
                width: 1200,
                height: 630,
                alt: 'Portfolio Site Screenshot',
                type: 'image/webp'
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


// defaultTitle: "Zachary's Portforlio",
//     titleTemplate: "%s | Zachary's Portforlio",
//         openGraph: {
//     type: 'website',
//         url: process.env.SITE_URL || 'example.com',
//             site_name: "Zachary's Portforlio",
//                 profile: {
//         firstName: 'Zachary',
//             lastName: 'Collins',
//         },
// },
// twitter: {
//     handle: '@ZachTheCollins',
//         site: '@ZachTheCollins',
//             cardType: 'summary_large_image',
//     }
