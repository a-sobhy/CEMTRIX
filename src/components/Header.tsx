"use client"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation";
// import logoImage from '../assets/crop-logo.png'
import { cn } from "../utils/cn"
import Image from "next/image";
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
  const router = useRouter();
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

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
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

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)

    // Route-based link (e.g., /about)
    if (!href.startsWith("#")) {
      router.push(href)
      return
    }

    // If we're NOT on the home page, navigate to "/" with the hash
    if (pathname !== "/") {
      router.push("/")
      return
    }

    // We're on "/", scroll to the element
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    window.history.replaceState(null, "", href)
  }

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false)
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      window.history.replaceState(null, "", "/")
    } else {
      router.push("/")
    }
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
          <motion.button
            type="button"
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
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link, index) => {
              const isActive = isLinkActive(link.href)
              return (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
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
                </motion.button>
              )
            })}
          </nav>

          {/* CTA Button */}
          <motion.div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("#contact")}
              className="px-6 py-2.25 rounded-full bg-linear-to-r from-[#008bfd] to-secondary text-white font-medium shadow-lg shadow-[#00c7fd]/25 hover:shadow-[#00c7fd]/40 transition-shadow cursor-pointer"
            >
              Book a Call
            </motion.button>
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
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "block w-full text-left py-2 transition-colors cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white",
                    )}
                  >
                    {link.name}
                  </button>
                )
              })}
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full px-6 py-3 rounded-full bg-linear-to-r from-[#008bfd] to-secondary text-white font-medium cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
