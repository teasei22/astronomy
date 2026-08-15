import type { Metadata } from "next";
import { Roadmap } from "@/components/Roadmap";

export const metadata: Metadata = { title: "学習ロードマップ" };

export default function RoadmapPage() {
  return <Roadmap />;
}
