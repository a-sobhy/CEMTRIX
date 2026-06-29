import { CaseStudies } from "@/components/CaseStudies";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
// import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
// import { Testimonials } from "@/components/Testimonials";
// import { Process } from "@/components/Process";
// import { Benefits } from "@/components/Benefits";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
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