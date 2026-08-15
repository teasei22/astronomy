import { ParallaxLab } from "@/components/ParallaxLab";

export function LessonInteractive({ slug }: { slug: string }) {
  if (slug === "parallax-distance") return <ParallaxLab />;
  return null;
}
