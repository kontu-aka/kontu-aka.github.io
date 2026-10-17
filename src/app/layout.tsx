import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./readability.css";
import "./showcase.css";
import "./section-colors.css";
import "./contact.css";

export const metadata: Metadata = {
  title: "kontu-aka — アイデアを、使えるかたちに。",
  description: "AIを活用した業務改善ツールの企画・制作に取り組むkontu-akaのポートフォリオ。政府調達データ分析ツールやAIプロトタイプなど、制作活動を紹介します。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
