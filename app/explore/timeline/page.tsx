import type { Metadata } from "next";
import { CosmicTimeline } from "@/components/CosmicTimeline";

export const metadata: Metadata = { title: "宇宙史タイムライン" };

export default function TimelinePage() {
  return <CosmicTimeline />;
}
