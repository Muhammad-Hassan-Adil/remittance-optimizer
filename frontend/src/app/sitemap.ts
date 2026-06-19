import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'http://localhost:3000'; // Change to production URL when deploying
    
    // Default static routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
    ];

    try {
        // Fetch dynamic platforms
        const res = await fetch('http://39.37.165.88:8010/api/platforms');
        if (res.ok) {
            const platforms = await res.json();
            const currencies = ['usd', 'gbp', 'eur', 'aud', 'aed'];
            for (const platform of platforms) {
                for (const currency of currencies) {
                    routes.push({
                        url: `${baseUrl}/payout/${currency}/${platform.slug}`,
                        lastModified: new Date(),
                        changeFrequency: 'always' as const, // Rates change constantly
                        priority: 0.9,
                    });
                }
            }
        }
    } catch (error) {
        console.error('Failed to fetch platforms for sitemap:', error);
    }

    return routes;
}
