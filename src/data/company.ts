import { BadgeCheck, ChartNoAxesColumn, Clock, Earth, Users, Wrench } from 'lucide-react';

/** "Who we are" and "Why CEMTRIX" content, from the CEMTRIX company brochure. */

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
