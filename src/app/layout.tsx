import type { Metadata } from "next";
import { Big_Shoulders, Big_Shoulders_Stencil, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Letreiro (storefront sign lettering) and stencil-painted notices.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  // next/font has no fallback metrics for this family yet.
  adjustFontFallback: false,
});

const bigShouldersStencil = Big_Shoulders_Stencil({
  variable: "--font-big-shoulders-stencil",
  subsets: ["latin"],
  axes: ["opsz"],
  adjustFontFallback: false,
});

const SITE_URL = "https://www.techvisions.com.br";
const TITLE = "Tech Visions — Sites e Tráfego Pago";
const DESCRIPTION =
  "Desenvolvimento de sites e gestão de tráfego pago (Meta Ads e Google Ads) para negócios que querem crescer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Tech Visions",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${bigShoulders.variable} ${bigShouldersStencil.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
