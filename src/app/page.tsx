import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faqs";
import { baseOpenGraph, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/site";
import { faqPageJsonLd, websiteJsonLd } from "@/lib/structured-data";

// <title> and the description come from the root layout. Social titles are set here, not in the
// layout, so other pages don't inherit the home page's og:title.
export const metadata: Metadata = {
  openGraph: {
    ...baseOpenGraph,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};
// import { Pricing } from "@/components/Pricing";
// import { Testimonials } from "@/components/Testimonials";
// import { Process } from "@/components/Process";
// import { Benefits } from "@/components/Benefits";

// Below-the-fold sections: still server-rendered (in the HTML for users and Google), but their
// JavaScript ships in separate chunks and hydrates after the hero, keeping it off the critical path.
const Challenge = dynamic(() => import("@/components/Challenge").then((m) => m.Challenge));
const Services = dynamic(() => import("@/components/Services").then((m) => m.Services));
const AboutPreview = dynamic(() => import("@/components/AboutPreview").then((m) => m.AboutPreview));
const CaseStudies = dynamic(() => import("@/components/CaseStudies").then((m) => m.CaseStudies));
const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ));
const ContactForm = dynamic(() => import("@/components/ContactForm").then((m) => m.ContactForm));

export default function Home() {
  return (
    <main>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Hero />
      <Challenge />
      <Services />
      <AboutPreview />
      <CaseStudies />
      <FAQ />
      <ContactForm />
      {/* <Process /> */}
      {/* <Benefits /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <CTA /> */}
    </main>
  );
}