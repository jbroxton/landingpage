import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Speqq - Where Product Managers Work",
  description: "Speqq brings your roadmaps, tasks, and team collaboration into a single, streamlined platform that adapts to how you work.",
  keywords: ["product management", "roadmaps", "requirements", "product managers", "PM tools", "integration"],
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Speqq - Where Product Managers Work",
    description: "Speqq brings your roadmaps, tasks, and team collaboration into a single, streamlined platform that adapts to how you work.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Speqq - Where Product Managers Work',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Speqq - Where Product Managers Work",
    description: "Speqq brings your roadmaps, tasks, and team collaboration into a single, streamlined platform that adapts to how you work.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden dark">
          {children}
        </div>
      </body>
    </html>
  );
}