export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

/** Shown in the home page FAQ section and emitted as FAQPage JSON-LD, so both always match. */
export const faqs: FaqItem[] = [
    {
        id: '1',
        question: 'How can AI automation help my business?',
        answer: 'AI automation can help your business by eliminating repetitive tasks, improving accuracy, reducing operational costs, and freeing up your team to focus on strategic initiatives. It can handle everything from data entry and customer support to complex decision-making processes.',
    },
    {
        id: '2',
        question: 'Is AI automation difficult to integrate?',
        answer: "Not at all! Our team handles the entire integration process seamlessly. We work with your existing tools and systems to ensure minimal disruption. Most businesses are up and running with their first automations within days.",
    },
    {
        id: '3',
        question: 'What industries can benefit from AI automation?',
        answer: "Virtually every industry can benefit! We've successfully implemented AI solutions in healthcare, finance, e-commerce, manufacturing, professional products, and more. The key is identifying the right processes to automate.",
    },
    {
        id: '4',
        question: 'Do I need technical knowledge to use AI automation?',
        answer: 'No technical knowledge required! Our solutions are designed to be user-friendly. We provide comprehensive training and ongoing support to ensure your team can effectively use and manage the automation systems.',
    },
    {
        id: '5',
        question: 'What kind of support do you offer?',
        answer: 'We offer comprehensive support including initial onboarding, training sessions, dedicated account management, 24/7 technical support for enterprise clients, and continuous optimization to ensure your automations perform at their best.',
    },
    {
        id: '6',
        question: 'Does CEMTRIX work with our existing equipment sensors?',
        answer: 'Yes. CEMTRIX Condition Intelligence uses AI to analyze the sensors and condition reports you already have, turning them into health scores, early warnings and maintenance decisions, with no new hardware required. Monitoring scales from small motors to your largest process equipment. CEMTRIX Plant Intelligence also connects directly to your existing SCADA and DCS systems, so your equipment data sits in one view with production, energy, quality and maintenance data.',
    },
];
