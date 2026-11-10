/**
 * Privacy Policy and Terms of Use content, rendered by `LegalPage`.
 *
 * Each section's `body` is a list of blocks: a string is a paragraph, a string
 * array is a bulleted list. The contact email and "Privacy Policy" are linked
 * automatically wherever they appear in the text.
 *
 * Describe what the site actually does: if the forms, analytics or email setup
 * change, update the Privacy Policy and its `lastUpdated` date.
 */

export const legalContact = {
    company: 'CEMTRIX',
    email: 'demo@cemtrix.ai',
    address: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
};

export type LegalBlock = string | string[];

export interface LegalSection {
    heading: string;
    body: LegalBlock[];
}

export interface LegalDocument {
    label: string;
    title: string;
    intro: string;
    lastUpdated: string; // ISO date
    sections: LegalSection[];
}

const { company, email, address } = legalContact;

export const privacyPolicy: LegalDocument = {
    label: 'Legal',
    title: 'Privacy Policy',
    intro: `This Privacy Policy explains what personal information ${company} collects through cemtrix.ai, how we use it, and the choices you have.`,
    lastUpdated: '2026-11-10',
    sections: [
        {
            heading: 'Who we are',
            body: [
                `${company} is an AI-powered industrial technology company serving the cement industry. ${company} is responsible for the personal information collected through this website.`,
                `Our address is ${address}. You can contact us about privacy at any time at ${email}.`,
            ],
        },
        {
            heading: 'Information you give us',
            body: [
                'When you use the contact form or ask about one of our products, we collect:',
                [
                    'your name and email address',
                    'your company name, if you provide it',
                    'your message, and the product you are asking about',
                ],
                'We also receive any information you include when you email or call us directly.',
            ],
        },
        {
            heading: 'Information collected automatically',
            body: [
                'When you visit the website, our hosting provider and the analytics tools we load through Google Tag Manager may collect technical information, such as:',
                [
                    'your IP address and approximate location derived from it',
                    'your browser, device type and operating system',
                    'the pages you visit, how long you stay and the site that referred you',
                ],
                'Some of this information is collected using cookies and similar technologies, described below.',
            ],
        },
        {
            heading: 'How we use your information',
            body: [
                [
                    'to reply to your enquiry and send you a confirmation that we received it',
                    'to follow up with information about the products you asked about',
                    'to understand how the website is used and improve it',
                    'to keep the website and our systems secure and prevent misuse',
                    'to meet our legal obligations',
                ],
                'We use your information only where we have a valid reason to: because you asked us to contact you, because it is in our legitimate interest to run and improve our business, with your consent, or where the law requires it. We do not sell your personal information.',
            ],
        },
        {
            heading: 'Cookies and analytics',
            body: [
                'We use Google Tag Manager to load analytics and measurement tools that help us understand how visitors use the website. These tools may set cookies in your browser.',
                'You can block or delete cookies through your browser settings. The website will still work if you do, although we will have less information about how it is used.',
            ],
        },
        {
            heading: 'Who we share it with',
            body: [
                'We share personal information only with service providers that help us run the website and handle enquiries, and only as needed for that purpose. They include:',
                [
                    'website hosting and infrastructure providers',
                    'email providers that deliver form submissions and our replies',
                    'analytics providers, including Google',
                ],
                'We may also disclose information where the law requires it, to protect our rights or the safety of others, or as part of a merger, acquisition or sale of our business.',
            ],
        },
        {
            heading: 'International transfers',
            body: [
                'Some of our service providers may store or process information outside the United Arab Emirates. Where that happens, we take reasonable steps to make sure your information remains protected.',
            ],
        },
        {
            heading: 'How long we keep it',
            body: [
                'We keep enquiry information for as long as we need it to respond to you and to manage any business relationship that follows, and for any longer period the law requires. After that, we delete it or make it anonymous.',
            ],
        },
        {
            heading: 'How we protect it',
            body: [
                'We use reasonable technical and organisational measures to protect personal information, including encrypted connections to the website. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
            ],
        },
        {
            heading: 'Your rights',
            body: [
                'Depending on where you live, you may have the right to:',
                [
                    'ask for a copy of the personal information we hold about you',
                    'ask us to correct or delete it',
                    'object to or ask us to limit how we use it',
                    'withdraw your consent where we rely on it',
                ],
                `To make a request, email ${email}. We may need to confirm your identity before we act on it. You may also have the right to complain to your local data protection authority.`,
            ],
        },
        {
            heading: 'Children',
            body: [
                'This website is intended for businesses and professionals. It is not directed at children, and we do not knowingly collect personal information from anyone under 18.',
            ],
        },
        {
            heading: 'Changes to this policy',
            body: [
                'We may update this Privacy Policy from time to time. When we do, we will change the "Last updated" date at the top of this page.',
            ],
        },
        {
            heading: 'Contact us',
            body: [`For any question about this Privacy Policy or your personal information, email ${email}.`],
        },
    ],
};

export const termsOfUse: LegalDocument = {
    label: 'Legal',
    title: 'Terms of Use',
    intro: `These Terms of Use govern your use of cemtrix.ai, the website operated by ${company}. By using the website, you agree to them.`,
    lastUpdated: '2026-11-10',
    sections: [
        {
            heading: 'About this website',
            body: [
                `This website provides information about ${company} and our AI products for the cement industry. Access to and use of our products and services is governed by separate written agreements, not by these Terms.`,
            ],
        },
        {
            heading: 'Using the website',
            body: [
                'You may use the website for lawful purposes only. You agree not to:',
                [
                    'interfere with, disrupt or try to gain unauthorised access to the website or its systems',
                    'introduce viruses or other harmful code',
                    'use automated tools to copy or extract content in a way that harms the website',
                    'submit false information or impersonate another person through our forms',
                ],
            ],
        },
        {
            heading: 'Intellectual property',
            body: [
                `The website and its content, including text, graphics, logos, product names such as SMARTCEM, images and software, are owned by ${company} or its licensors and are protected by intellectual property laws.`,
                `You may view the website and print or download pages for your own internal business reference. You may not copy, modify, distribute or use the content for any other purpose without our written permission.`,
            ],
        },
        {
            heading: 'Information on the website',
            body: [
                'The content on this website is general information about our company and products. It is not professional advice and does not form an offer or a contract.',
                'Results, figures and case studies describe outcomes from specific deployments. Results depend on each plant’s conditions, data and processes, so they are not a guarantee of the results you will achieve.',
                'We aim to keep the website accurate and up to date, but we may change its content at any time without notice.',
            ],
        },
        {
            heading: 'Enquiries',
            body: [
                'Sending us an enquiry through the website does not create an agreement or any obligation on either side. We handle the information you submit as described in our Privacy Policy.',
            ],
        },
        {
            heading: 'Links to other websites',
            body: [
                'The website may link to websites run by others. We do not control those websites and are not responsible for their content or practices.',
            ],
        },
        {
            heading: 'Disclaimer',
            body: [
                'The website is provided "as is" and "as available". To the extent permitted by law, we make no warranties of any kind about the website, including that it will be uninterrupted, error-free or free of harmful components.',
            ],
        },
        {
            heading: 'Limitation of liability',
            body: [
                `To the extent permitted by law, ${company} is not liable for any indirect, incidental or consequential loss, or for any loss of profit, revenue, data or business opportunity, arising from your use of or inability to use the website. Nothing in these Terms limits liability that cannot be limited by law.`,
            ],
        },
        {
            heading: 'Changes to these terms',
            body: [
                'We may update these Terms from time to time. The "Last updated" date at the top of this page shows when they last changed. Continuing to use the website after a change means you accept the updated Terms.',
            ],
        },
        {
            heading: 'Governing law',
            body: [
                'These Terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have exclusive jurisdiction over any dispute arising from them.',
            ],
        },
        {
            heading: 'Contact us',
            body: [`For any question about these Terms, email ${email}.`],
        },
    ],
};
