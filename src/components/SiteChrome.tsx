"use client";
import { usePathname } from "next/navigation";

// Routes that render on their own, without the site navbar, footer and scroll-to-top button.
// /card is the contact card a printed QR code points to (https://cemtrix.ai/card).
const STANDALONE_ROUTES = ["/card"];

const isStandalone = (pathname: string) =>
  STANDALONE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

// Wraps site-wide chrome in the root layout and renders nothing on standalone routes.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return isStandalone(pathname) ? null : children;
}
