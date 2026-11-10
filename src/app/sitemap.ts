import type { MetadataRoute } from 'next';

import { services } from '@/data/services';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL;
    const lastModified = new Date();

    // Only products the site links to (readMore) get a detail page in the sitemap.
    const productPages: MetadataRoute.Sitemap = services
        .filter((service) => service.readMore)
        .map((service) => ({
            url: `${baseUrl}/products/${service.id}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        }));

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...productPages,
        ...['/privacy', '/terms'].map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        })),
    ];
}
