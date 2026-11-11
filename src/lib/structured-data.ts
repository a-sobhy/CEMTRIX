import type { FaqItem } from '@/data/faqs';
import type { ServiceData } from '@/data/services';

import { SITE_URL } from './site';

type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'CEMTRIX',
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo.png`,
        description:
            'CEMTRIX is an AI-powered industrial technology company that helps cement plants improve workforce capability, plant performance and equipment reliability with AI-powered learning, operational intelligence and predictive maintenance.',
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
        provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'CEMTRIX', url: SITE_URL },
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
