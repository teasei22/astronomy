import type { Metadata } from "next";
import { AstronomyLab } from "@/components/AstronomyLab";

export const metadata: Metadata = { title: "Python Astronomy Lab" };

export default function LabPage() {
  return <AstronomyLab />;
}
