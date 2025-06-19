import type { Metadata } from "next";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/instrument-sans/700.css";
import "./globals.css";
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: "Cicco.AI - Premium AI Automation Agency",
  description: "We build practical AI automation systems for small to medium-sized businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
