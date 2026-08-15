import type { Metadata } from "next";
import { ScaleExplorer } from "@/components/ScaleExplorer";

export const metadata: Metadata = { title: "宇宙スケール実験" };

export default function ScalePage() {
  return <ScaleExplorer />;
}
