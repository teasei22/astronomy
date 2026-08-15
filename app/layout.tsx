import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: { default: "ASTRAEA | 証拠から学ぶ天文学", template: "%s | ASTRAEA" },
  description: "初心者から大学学部相当の到達を目指し、観測・物理・数学・データを定量的につなぐ天文学教材。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
