export default {
    defaultTitle: "Zachary's Portforlio",
    titleTemplate: "%s | Zachary's Portforlio",
    openGraph: {
        type: 'website',
        url: process.env.SITE_URL || 'example.com',
        site_name: "Zachary's Portforlio",
        profile: {
            firstName: 'Zachary',
            lastName: 'Collins',
        },
    },
    twitter: {
        handle: '@ZachTheCollins',
        site: '@ZachTheCollins',
        cardType: 'summary_large_image',
    }
}