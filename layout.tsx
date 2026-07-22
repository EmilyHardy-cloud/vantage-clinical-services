import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const frauncesSerif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vantage Clinical Strategy Ltd | Psychosocial Risk Audit & Legal Defensibility",
  description:
    "Forensic psychosocial risk audit for UK employers. We make workplace mental-health risk legally defensible, commercially visible and managerially controllable. Built for CEOs, HRDs and boards.",
  keywords: [
    "psychosocial risk",
    "workplace stress",
    "employment tribunal",
    "HSE risk assessment",
    "legal defensibility",
    "board assurance",
    "Vantage Clinical Strategy",
  ],
  authors: [{ name: "Vantage Clinical Strategy Ltd" }],
  openGraph: {
    title: "Vantage Clinical Strategy Ltd",
    description:
      "Psychosocial Risk Audit — making workplace mental-health risk legally defensible, commercially visible and managerially controllable.",
    siteName: "Vantage Clinical Strategy Ltd",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${frauncesSerif.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
