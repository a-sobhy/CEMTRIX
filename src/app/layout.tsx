import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoToTop } from "@/components/GoToTop";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CEMTRIX",
  description: "AI-Native Industrial Intelligence Platform for the Cement Industry",
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