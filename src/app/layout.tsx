import { Footer } from "@/components/Footer";
import { GoToTop } from "@/components/GoToTop";
import { Header } from "@/components/Header";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://cemtrixai.com"),
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
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GoToTop />
        </Providers>
        {/* {children} */}
      </body>
    </html>
  );
}