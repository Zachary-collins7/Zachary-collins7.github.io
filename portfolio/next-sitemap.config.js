const { userAgent } = require('next/server')

const botAgents = [
    'Googlebot',
    'Slurp',
    'Yahoo! Slurp',
    'msnbot',
    'bingbot',
    'Baiduspider',
    'YandexBot',
    'Sogou web spider',
    'Sosospider',
    'Sogou web spider',
    'AdsBot-Google',
    'magpie-crawler',
    'feedjira',
];

const blockBotPaths = [
    '/api/',
    '/no-robots/',
    '/private/',
];


/** @type {import('next-sitemap').IRobotPolicy[]} */
const generatedPolicies = botAgents.map(botAgent => {
    return {
        userAgent: botAgent,
        disallow: blockBotPaths
    }
});


/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://example.com',
    sitemapSize: 7000,
    outDir: 'out',
    changefreq: 'monthly',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            ...generatedPolicies,
        ]
    }
};

module.exports = config;
