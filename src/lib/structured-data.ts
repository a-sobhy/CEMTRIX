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

export function productJsonLd(service: ServiceData): JsonLdObject {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${SITE_URL}/products/${service.id}#product`,
        name: service.category,
        alternateName: service.title,
        description: service.fullDescription,
        url: `${SITE_URL}/products/${service.id}`,
        category: 'Industrial AI software for cement plants',
        brand: { '@id': ORGANIZATION_ID },
        manufacturer: { '@id': ORGANIZATION_ID },
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
