import type { Metadata } from "next";
import { Suspense } from "react";
import { GlossaryBrowser } from "@/components/GlossaryBrowser";

export const metadata: Metadata = { title: "天文学用語集" };

export default function GlossaryPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-[var(--muted)]">用語集を読み込んでいます…</div>}>
      <GlossaryBrowser />
    </Suspense>
  );
}
