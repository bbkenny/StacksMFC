import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./components/navbar";
import { Ticker } from "./components/Ticker";
import { ThemeProvider } from "./components/providers/theme-provider";
import { StacksProvider } from "./components/providers/stacks-provider";
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
  title: "Stacks MFC - Bitcoin Finance Radar",
  description: "Lightweight Bitcoin & Stacks financial console for balances and DeFi monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StacksProvider>
            <div className="flex flex-col min-h-screen">
              <Ticker />
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
            </div>
          </StacksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
