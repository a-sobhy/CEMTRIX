export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

/**
 * Single source for the home page FAQ section and the FAQPage JSON-LD, so both always match.
 * Answers only restate what the site already says (home, about and product pages, data/company.ts,
 * data/services.ts). Don't add numbers, customers or claims that aren't published elsewhere on the site.
 */
export const faqs: FaqItem[] = [
    {
        id: 'what-is-cemtrix-ai',
        question: 'What is Cemtrix AI?',
        answer: 'Cemtrix AI (CEMTRIX) is an AI-powered industrial technology company for the cement industry. It combines artificial intelligence, machine learning and deep cement-industry expertise in three integrated AI products: SMARTCEM for workforce learning, Plant Intelligence for plant performance, and Condition Intelligence for predictive maintenance.',
    },
    {
        id: 'what-is-smartcem',
        question: 'What is SMARTCEM?',
        answer: 'SMARTCEM is the Cemtrix AI learning intelligence platform, purpose-built for the cement industry. It identifies workforce competency gaps, delivers personalized learning journeys and gives employees an interactive AI assistant with instant access to technical knowledge, best practices and operational guidance, backed by 10,000+ knowledge resources. It helps plants accelerate workforce development and preserve critical expertise before experienced people retire.',
    },
    {
        id: 'plant-performance-and-maintenance',
        question: 'How does Cemtrix AI improve cement plant performance and reduce unplanned downtime?',
        answer: 'Cemtrix AI Plant Intelligence connects production, energy, quality, maintenance and business systems into a single AI-powered platform, with real-time KPI visibility, automated performance monitoring and AI-driven operational insights, so every team works from one source of truth. Cemtrix AI Condition Intelligence adds predictive maintenance: it analyzes your equipment data to produce health scores, early warnings and maintenance decisions, so issues are caught before they stop production.',
    },
    {
        id: 'integration',
        question: 'Does Cemtrix AI work with our existing SCADA, DCS and equipment sensors?',
        answer: 'Yes. Cemtrix AI Plant Intelligence connects directly to your existing SCADA and DCS systems, so your equipment data sits in one view with production, energy, quality and maintenance data. Cemtrix AI Condition Intelligence analyzes the sensors and condition reports you already have, with no new hardware required, and monitoring scales from small motors to your largest process equipment.',
    },
    // TODO: confirm deployment timing. If there is a typical timeline (for example per product or for a
    // first phase), add it here; today the site only says deployments are tailored, not plug-and-play.
    {
        id: 'deployment',
        question: 'How long does it take to deploy Cemtrix AI in a cement plant?',
        answer: 'Cemtrix AI is tailored, not plug-and-play: every deployment is configured to the plant’s own processes, data and priorities, and builds on the systems and sensors you already have. The timeline depends on which products you start with and the systems involved. Contact us to discuss the scope and timeline for your plant.',
    },
    // TODO: replace with the real data-security facts (where plant data is hosted, cloud or on-premises
    // options, encryption, access control, certifications). The site doesn't state any of these yet,
    // so this answer only says what is already published.
    {
        id: 'data-security',
        question: 'How does Cemtrix AI keep our plant data secure?',
        answer: 'Every Cemtrix AI deployment is configured around the plant’s own data and priorities. Contact us to review your security and data-access requirements before deployment, and we will walk you through how your plant data is handled.',
    },
];
