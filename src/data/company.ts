import {
    BadgeCheck,
    ChartNoAxesColumn,
    Clock,
    Database,
    Earth,
    Gauge,
    GraduationCap,
    Leaf,
    ShieldCheck,
    TriangleAlert,
    Users,
    Wrench,
    Zap,
} from 'lucide-react';

/** "The challenge", "Who we are" and "Why CEMTRIX" content, from the CEMTRIX company brochure. */

/** Each pressure points to the CEMTRIX product that answers it (`answer.href` is the product's section id on the home page). */
export const challenge = {
    label: 'The challenge',
    heading: { lead: 'The pressures every cement plant', highlight: 'is facing today' },
    pressures: [
        {
            icon: Users,
            title: 'Expertise walking out the door',
            description: 'Experienced people retire faster than their knowledge can be captured and passed on.',
            answer: { name: 'SMARTCEM', href: '#learning-platform' },
        },
        {
            icon: Zap,
            title: 'Energy and cost pressure',
            description: 'Fuel, power and raw-material costs leave little room for inefficiency in any process.',
            answer: { name: 'Plant Intelligence', href: '#plant-platform' },
        },
        {
            icon: TriangleAlert,
            title: 'Unplanned downtime',
            description: 'Unexpected equipment failures stop production and trigger costly emergency repairs.',
            answer: { name: 'Condition Intelligence', href: '#condition-intelligence' },
        },
        {
            icon: Database,
            title: 'Data without decisions',
            description: 'Plant data sits in disconnected systems instead of driving timely action.',
            answer: { name: 'Plant Intelligence', href: '#plant-platform' },
        },
    ],
    closing: {
        lead: 'CEMTRIX can close these gaps -',
        highlight: 'when it is built around how a cement plant actually runs.',
    },
};

export const whoWeAre = {
    label: 'Who we are',
    heading: 'AI built for cement, by people who know cement',
    description:
        'CEMTRIX is an AI-powered industrial technology company. We combine artificial intelligence, machine learning and deep cement-industry expertise to strengthen workforce capability, operational performance and asset reliability.',
    stats: [
        { value: '25+', label: 'AI, software and cement specialists' },
        { value: '3', label: 'integrated AI products' },
        { value: '1', label: 'proprietary CEMTRIX AI Engine' },
    ],
    tailored: {
        lead: 'Tailored, not plug-and-play:',
        text: 'every deployment is configured to the plant’s own processes, data and priorities.',
    },
};

export const ourVision = {
    heading: 'Our vision',
    statement:
        'A cement industry where every plant runs on intelligence - where AI and experienced people work side by side to make cement more efficiently, more reliably and more sustainably than ever before.',
    pillars: [
        {
            icon: GraduationCap,
            title: 'Knowledge that stays',
            description: 'Plant expertise captured, shared and grown - never lost to retirement.',
        },
        {
            icon: Gauge,
            title: 'Self-optimising plants',
            description: 'Production, energy and quality continuously tuned by AI, around the clock.',
        },
        {
            icon: ShieldCheck,
            title: 'No unplanned stops',
            description: 'Equipment issues predicted and handled long before they halt production.',
        },
        {
            icon: Leaf,
            title: 'Lower-carbon cement',
            description: 'Less energy and fewer emissions for every tonne produced.',
        },
    ],
};

export const whyCemtrix = {
    label: 'Why CEMTRIX',
    heading: 'What plants gain with CEMTRIX',
    items: [
        {
            icon: ChartNoAxesColumn,
            title: 'Better operational performance',
            description: 'Optimise production, energy and quality with AI-powered insight.',
        },
        {
            icon: Users,
            title: 'A future-ready workforce',
            description: 'Close competency gaps and preserve critical knowledge.',
        },
        {
            icon: Wrench,
            title: 'Greater asset reliability',
            description: 'Predict issues, reduce downtime and extend asset life.',
        },
        {
            icon: Clock,
            title: 'Faster decisions',
            description: 'The right information to the right people at the right time.',
        },
        {
            icon: BadgeCheck,
            title: 'One unified platform',
            description: 'Plant intelligence and workforce data in one place.',
        },
        {
            icon: Earth,
            title: 'Stronger sustainability',
            description: 'Reduce energy use and emissions through intelligent optimisation.',
        },
    ],
};
