import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { termsOfUse } from '@/data/legal';

export const metadata: Metadata = {
    title: 'Terms of Use',
    description: 'The terms that govern your use of cemtrix.ai, the CEMTRIX website.',
    alternates: { canonical: '/terms' },
};

export default function TermsPage() {
    return <LegalPage document={termsOfUse} />;
}
