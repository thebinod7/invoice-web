module.exports = {
    siteUrl: 'https://invomaker.com',
    generateRobotsTxt: false,
    sitemapSize: 7000,

    exclude: [
        // Dashboard (all subpaths)
        '/dashboard',
        '/dashboard/subscription',
        '/dashboard/profile',
        '/dashboard/feedback',
        '/dashboard/my-referrals',
        '/dashboard/invoices',
        '/dashboard/my-invoices',
        '/dashboard/my-usage',

        // Auth & admin
        '/admin',
        '/auth',
        '/signup',

        // Utility / no SEO value
        '/thanks',
        '/statss',
        '/releases',
        '/advertise',
    ],

    transform: async (config, path) => {
        // Priority + changefreq by page type
        const rules = [
            {
                match: (p) => p === '/',
                priority: 1.0,
                changefreq: 'daily',
            },
            {
                match: (p) =>
                    [
                        '/free-invoice-generator',
                        '/free-invoice-maker',
                        '/invoice-builder',
                        '/create-invoice',
                    ].includes(p),
                priority: 0.9,
                changefreq: 'weekly',
            },
            {
                match: (p) =>
                    [
                        '/freelancer-invoice-generator',
                        '/consultant-invoice-generator',
                        '/invoice-generator-usa-canada',
                    ].includes(p),
                priority: 0.8,
                changefreq: 'weekly',
            },
            {
                match: (p) => p === '/blog',
                priority: 0.8,
                changefreq: 'daily',
            },
            {
                match: (p) => p.startsWith('/blog/'),
                priority: 0.7,
                changefreq: 'weekly',
            },
            {
                match: (p) => ['/faq', '/pricing', '/contact', '/support', '/tools'].includes(p),
                priority: 0.5,
                changefreq: 'monthly',
            },
            {
                match: (p) => ['/privacy', '/terms'].includes(p),
                priority: 0.3,
                changefreq: 'yearly',
            },
        ]

        const rule = rules.find((r) => r.match(path))

        return {
            loc: path,
            changefreq: rule?.changefreq ?? 'weekly',
            priority: rule?.priority ?? 0.6,
            lastmod: new Date().toISOString(),
        }
    },
}
