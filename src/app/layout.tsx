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
  metadataBase: new URL('https://ciccoai-site.vercel.app'),
  openGraph: {
    title: "Cicco.AI - Premium AI Automation Agency",
    description: "We build practical AI automation systems for small to medium-sized businesses.",
    url: 'https://ciccoai-site.vercel.app',
    siteName: 'Cicco.AI',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
