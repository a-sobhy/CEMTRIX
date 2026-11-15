import type { FaqItem } from '@/data/faqs';
import type { ServiceData } from '@/data/services';

import { SITE_NAME, SITE_URL } from './site';

type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * `name` is "Cemtrix AI", the same as the <title>, og:site_name and WebSite name, so every signal
 * names the brand the same way. The all-caps wordmark and other spellings go in `alternateName`.
 * When the company has real public profiles (LinkedIn, X, YouTube, Crunchbase), add them as
 * `sameAs: [...]`. Real URLs only, never placeholders.
 */
export function organizationJsonLd(): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: ['CEMTRIX', 'Cemtrix', 'CemtrixAI'],
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo.png`,
        description:
            'Cemtrix AI (CEMTRIX) is an AI-powered industrial technology company that helps cement plants improve workforce capability, plant performance and equipment reliability with AI-powered learning, operational intelligence and predictive maintenance.',
    };
}

/** Home page only: Google reads the site name from WebSite markup on the home page. */
export function websiteJsonLd(): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        alternateName: 'CEMTRIX',
        url: `${SITE_URL}/`,
        publisher: { '@id': ORGANIZATION_ID },
    };
}

/**
 * Uses `Service`, not `Product`: Google requires Product markup to carry `offers`,
 * `review` or `aggregateRating`, and these B2B platforms are sold through demos with
 * no public price or reviews. Don't add placeholder prices or ratings to get around it.
 */
export function serviceJsonLd(service: ServiceData): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}/products/${service.id}#service`,
        name: `${service.category} – ${service.title}`,
        serviceType: service.title,
        category: 'Industrial AI software for cement plants',
        description: service.fullDescription,
        url: `${SITE_URL}/products/${service.id}`,
        provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
        areaServed: 'Worldwide',
    };
}

export function faqPageJsonLd(items: FaqItem[]): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
}
