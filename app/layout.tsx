import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Speqq - Modern App Solution",
  description: "Simplify your workflow with Speqq - the all-in-one solution designed to elevate your productivity and streamline complex tasks.",
  keywords: ["productivity", "workflow", "automation", "analytics", "tools", "integration"],
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}