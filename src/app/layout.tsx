import { Footer } from "@/components/Footer";
import { GoToTop } from "@/components/GoToTop";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Self-hosted woff2, latin subset, font-display: swap and size-adjusted fallback metrics.
// Weights match the design exactly: font-semibold (600) resolves to 700 and font-black (900)
// resolves to 800 (ExtraBold), as they did with the old .otf files. Don't add 600 or 900
// without checking the design: those classes would change appearance.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cemtrix.ai"),
  title: {
    default:
      "CEMTRIX | AI Platform for Cement Plant Intelligence & Predictive Maintenance",
    template: "%s | CEMTRIX",
  },
  description:
    "CEMTRIX helps cement plants improve workforce capability, plant performance, and equipment reliability with AI-powered learning, operational intelligence, and predictive maintenance.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <GoToTop />

        {/* Google Tag Manager: lazyOnload keeps its ~180 KB out of the critical path. Trade-off:
            visits that end within the first second or two aren't recorded. */}
        <Script id="gtm-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-PD9QT73S"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}