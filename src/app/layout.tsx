import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./readability.css";
import "./showcase.css";
import "./section-colors.css";
import "./contact.css";
import "./studio-branding.css";
import "./ctxent-cta.css";
import "./works-order.css";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/* R5.2: the old title and description named the site but not the work, so a
   search result gave a visitor nothing to decide on. Both now lead with what
   can be asked for here, and every claim in them matches a project listed on
   the page - no service, rate or turnaround that the site does not show. */
const title = "こんつの制作室 — AI業務改善ツールの企画・制作 | kontu-aka";
const description =
  "AI導入前の確認事項の整理、問い合わせ対応の下書き支援、公開データの収集・可視化。身近な業務の困りごとから業務改善ツールを企画・制作しています。制作実績4件と、お仕事のご相談窓口を掲載。";

export const metadata: Metadata = {
  metadataBase: new URL("https://kontu-aka.github.io/"),
  title,
  description,
  alternates: { canonical: `${basePath}/` },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "こんつの制作室 / kontu-aka",
    url: `${basePath}/`,
    title: "こんつの制作室（kontu-aka）— アイデアを、使えるかたちに。",
    description,
    images: [{
      url: `${basePath}/og-cover.png`,
      width: 1200,
      height: 630,
      alt: "こんつの制作室 / kontu-aka — アイデアを、使えるかたちに。AI活用・データ分析・業務改善。",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "こんつの制作室（kontu-aka）— アイデアを、使えるかたちに。",
    description,
    images: [`${basePath}/og-cover.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "32x32" },
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
