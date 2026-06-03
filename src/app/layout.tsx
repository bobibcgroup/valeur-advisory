import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://valeuradvisory.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Valeur Advisory",
    template: "%s | Valeur Advisory",
  },

  description:
    "We help founders, executives, brands, and organizations build credibility, attract opportunities, and create lasting market presence.",

  keywords: [
    "advisory",
    "brand strategy",
    "executive advisory",
    "thought leadership",
    "personal brand",
    "credibility",
    "business growth",
    "founder advisory",
    "influence",
    "authority building",
  ],

  authors: [{ name: "Valeur Advisory" }],
  creator: "Valeur Advisory",
  publisher: "Valeur Advisory",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Valeur Advisory",
    title: "Valeur Advisory — Influence. Authority. Growth.",
    description:
      "We help founders, executives, brands, and organizations build credibility, attract opportunities, and create lasting market presence.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Valeur Advisory — Influence. Authority. Growth.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Valeur Advisory — Influence. Authority. Growth.",
    description:
      "We help founders, executives, brands, and organizations build credibility, attract opportunities, and create lasting market presence.",
    images: ["/opengraph-image"],
    creator: "@valeuradvisory",
  },

  alternates: {
    canonical: SITE_URL,
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
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
