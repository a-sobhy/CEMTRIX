import { AboutPreview } from "@/components/AboutPreview";
import { CaseStudies } from "@/components/CaseStudies";
import { Challenge } from "@/components/Challenge";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faqs";
import { faqPageJsonLd } from "@/lib/structured-data";
// import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
// import { Testimonials } from "@/components/Testimonials";
// import { Process } from "@/components/Process";
// import { Benefits } from "@/components/Benefits";

export default function Home() {
  return (
    <main>
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