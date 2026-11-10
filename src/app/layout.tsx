import { Footer } from "@/components/Footer";
import { GoToTop } from "@/components/GoToTop";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GoToTop />
        </Providers>

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-PD9QT73S"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}