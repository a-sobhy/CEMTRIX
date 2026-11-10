import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { privacyPolicy } from '@/data/legal';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'How CEMTRIX collects, uses and protects personal information submitted through cemtrix.ai.',
    alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
    return <LegalPage document={privacyPolicy} />;
}
