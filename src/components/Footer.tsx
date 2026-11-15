"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Products with a detail page link to it; the rest link to their home page section.
const serviceLinks = [
  { label: "Learning platform", href: "/products/learning-platform" },
  { label: "Plant Intelligence", href: "/products/plant-platform" },
  { label: "Condition Intelligence", href: "#condition-intelligence" },
]

// No "Products" entry: the products column above already lists them.
const sectionLinks = [
  { label: "About", href: "/about" },
  // { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  // { label: "Benefits", href: "#benefits" },
  // { label: "Pricing", href: "#pricing" },
  // { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

// "#faq" -> "/#faq" so section links also work from other pages.
const toHref = (href: string) => (href.startsWith("#") ? `/${href}` : href)

export function Footer() {
  const pathname = usePathname();

  const handleFooterLink =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Route links and section links from other pages are handled by <Link>.
      if (!href.startsWith("#") || pathname !== "/") return

      event.preventDefault()
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", href)
    }

  return (
    <footer className="border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <Image
              src={new URL('../assets/crop-logo.png', import.meta.url).href}
              alt="Logo"
              className="h-10 rounded-xl object-contain"
              width={100}
              height={100}
            />
            <p className="max-w-sm leading-relaxed text-gray-400 my-6">
              CEMTRIX helps cement plants improve workforce capability, plant
              performance and equipment reliability with AI-powered learning,
              operational intelligence and predictive maintenance.
            </p>
            {/* LinkedIn button removed until the company page exists (it pointed to linkedin.com).
                To restore it, add the real company page URL and the assets/linkedin.svg icon. */}
          </div>

          {/* Service links */}
          <div>
            {/* h2, not h4: headings must not skip levels. Styling comes from the classes. */}
            <h2 className="mb-5 font-semibold text-white">Our AI-Powered Products</h2>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={toHref(link.href)}
                    onClick={handleFooterLink(link.href)}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section links */}
          <div>
            <h2 className="mb-5 font-semibold text-white">Sections</h2>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {sectionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={toHref(link.href)}
                    onClick={handleFooterLink(link.href)}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} <Image
              src={new URL('../assets/icon.png', import.meta.url).href}
              alt="Logo"
              className="w-5 rounded-xl object-contain"
              width={100}
              height={100}
            /> CEMTRIX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
