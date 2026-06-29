"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const linkedInIcon = new URL("../assets/linkedin.svg", import.meta.url).href

const serviceLinks = [
  { label: "Learning platform", href: "#learning-platform" },
  { label: "Plant Intelligence", href: "#plant-platform" },
  { label: "Predictive Maintenance", href: "#predictive-maintenance" },
]

const sectionLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "#products" },
  // { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  // { label: "Benefits", href: "#benefits" },
  // { label: "Pricing", href: "#pricing" },
  // { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleFooterLink =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()

      if (!href.startsWith("#")) {
        router.push(href)
        return
      }

      if (pathname !== "/") {
        router.push("/")
        return
      }

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
              CEMTRIX builds AI automation systems that remove repetitive work,
              connect your tools, and help modern teams scale faster with less
              operational drag.
            </p>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Image
                src={linkedInIcon}
                alt=""
                className="h-4 w-4"
                aria-hidden="true"
                height={16}
                width={16}
              />
              LinkedIn
            </a>
          </div>

          {/* Service links */}
          <div>
            <h4 className="mb-5 font-semibold text-white">Our AI-Powered Products</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`/${link.href}`}
                    onClick={handleFooterLink(link.href)}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section links */}
          <div>
            <h4 className="mb-5 font-semibold text-white">Sections</h4>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {sectionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={
                      link.href.startsWith("#") ? `/${link.href}` : link.href
                    }
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
            <a
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
