import { HeroVideo } from "./hero/HeroVideo";
import PerspectiveGrid from "./hero/PerspectiveGrid";

// The page's only H1 - keep "AI for cement plants" in it.
const headline1 = "AI-Native Industrial Intelligence Platform";
const headline2 = "AI for Cement Plants";
const HERO_TAGLINE = "Empower People\nOptimize Assets\nAccelerate Performance";

/**
 * Server component: the hero text is in the initial HTML and its entrance animation is pure
 * CSS (`.hero-in` in globals.css), so the headline - the page's LCP element - never waits for
 * JavaScript to load. Keep the delays short; long delays push LCP back.
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030014]">
      {/* Background Layers */}
      <HeroVideo />
      <PerspectiveGrid />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-dark/50 to-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-24 lg:grid-cols-6">
          <div className="lg:text-left lg:col-span-4">
            <p className="hero-in text-xl sm:text-2xl lg:text-2xl tracking-tight text-gray-400">
              {headline1}
            </p>
            <p
              className="hero-in font-bold text-5xl sm:text-6xl lg:text-5xl line-h text-white whitespace-pre-line my-4 leading-15"
              style={{ animationDelay: "0.1s" }}
            >
              {HERO_TAGLINE}
            </p>
            <h1
              className="hero-in text-5xl sm:text-6xl lg:text-5xl leading-tight tracking-tight gradient-text mb-4"
              style={{ animationDelay: "0.3s" }}
            >
              {headline2}
            </h1>
            <p
              className="hero-in font-normal text-[#F8FAFC] mx-auto lg:mx-0 leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              CEMTRIX delivers intelligent solutions across workforce
              development, plant performance, and predictive maintenance
              turning operational data and organizational knowledge into
              measurable business value.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
}
