import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: "About Us – AI Built for the Cement Industry",
    description:
        "CEMTRIX combines AI and deep cement-industry expertise to help cement plants strengthen workforce capability, plant performance and asset reliability.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
