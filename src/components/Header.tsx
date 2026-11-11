"use client"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
// import logoImage from '../assets/crop-logo.png'
import { cn } from "../utils/cn"
import Image from "next/image";
import Link from "next/link";

// Real <Link>s (not buttons + router.push) so Next prefetches the target route
// and navigation is instant.
const MotionLink = motion.create(Link)

// "#faq" -> "/#faq" so section links also work from other pages.
const toHref = (href: string) => (href.startsWith("#") ? `/${href}` : href)
const navLinks = [
  { name: "About", href: "/about" },
  { name: "Products", href: "#products" },
  // { name: "Process", href: "#process" },
  { name: "Case Studies", href: "#case-studies" },
  // { name: "Benefits", href: "#benefits" },
  // { name: "Pricing", href: "#pricing" },
  // { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // If we're on a different page, mark that page as active
      if (pathname !== "/") {
        setActiveSection(pathname.replace("/", ""))
        return
      }

      // Get only hash-based sections
      const sections = navLinks
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href.replace("#", ""))

      const scrollPosition = window.scrollY + window.innerHeight / 3

      // ─── FIX: Check if we're above the first section ───
      const firstSectionEl = document.getElementById(sections[0])
      if (firstSectionEl && scrollPosition < firstSectionEl.offsetTop) {
        setActiveSection("")
        return
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 50

      if (atBottom) {
        setActiveSection(sections[sections.length - 1])
        return
      }

      // Find the current section (bottom-up)
      let current = ""
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          current = sections[i]
          break
        }
      }

      setActiveSection(current)
    }

    // handleScroll reads layout (offsetTop, scrollHeight). Run it at most once per frame, in
    // requestAnimationFrame, so it never forces a synchronous layout during hydration or on
    // every scroll event.
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        handleScroll()
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  // ─── FIX: When navigating to "/" with a hash, scroll to that section ───
  useEffect(() => {
    if (pathname === "/" && location.hash) {
      // Small delay to ensure the page has rendered
      const timeout = setTimeout(() => {
        const element = document.querySelector(location.hash)
        element?.scrollIntoView({ behavior: "smooth" })
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [pathname])

  // Route links and section links from other pages are handled by <Link>.
  // On the home page, section links smooth-scroll in place instead.
  const handleNavClick = (href: string) => (event: React.MouseEvent) => {
    setIsMobileMenuOpen(false)

    if (!href.startsWith("#") || pathname !== "/") return

    event.preventDefault()
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    window.history.replaceState(null, "", href)
  }

  const handleLogoClick = (event: React.MouseEvent) => {
    setIsMobileMenuOpen(false)
    if (pathname !== "/") return

    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.replaceState(null, "", "/")
  }

  const isLinkActive = (href: string) => {
    if (href.startsWith("#")) {
      return (
        pathname === "/" && activeSection === href.replace("#", "")
      )
    }
    return pathname === href
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-dark-light/80 backdrop-blur-custom" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <MotionLink
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-40">
              <Image
                src={new URL('../assets/crop-logo.png', import.meta.url).href}
                alt="Logo"
                className="rounded-xl object-contain"
                width={200}
                height={200}
              />
            </div>
          </MotionLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link, index) => {
              const isActive = isLinkActive(link.href)
              return (
                <MotionLink
                  key={link.name}
                  href={toHref(link.href)}
                  onClick={handleNavClick(link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "transition-colors relative group py-2 cursor-pointer",
                    isActive ? "text-white" : "text-gray-400 hover:text-white",
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-[#00c7fd] to-secondary transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </MotionLink>
              )
            })}
          </nav>

          {/* CTA Button */}
          <motion.div className="hidden lg:flex items-center gap-4">
            <MotionLink
              href={toHref("#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavClick("#contact")}
              className="px-6 py-2.25 rounded-full bg-linear-to-r from-[#008bfd] to-secondary text-white font-medium shadow-lg shadow-[#00c7fd]/25 hover:shadow-[#00c7fd]/40 transition-shadow cursor-pointer"
            >
              Book a Call
            </MotionLink>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-light/95 backdrop-blur-custom border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href)
                return (
                  <Link
                    key={link.name}
                    href={toHref(link.href)}
                    onClick={handleNavClick(link.href)}
                    className={cn(
                      "block w-full text-left py-2 transition-colors cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white",
                    )}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Link
                href={toHref("#contact")}
                onClick={handleNavClick("#contact")}
                className="block w-full text-center px-6 py-3 rounded-full bg-linear-to-r from-[#008bfd] to-secondary text-white font-medium cursor-pointer"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
