import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ScientificStatus = "Established" | "Strong Evidence" | "Active Research" | "Hypothesis" | "Unknown";

export type LessonMeta = {
  slug: string;
  code: string;
  level: number;
  module: string;
  title: string;
  titleEn: string;
  summary: string;
  duration: number;
  outcomes: string[];
  prerequisites: string[];
  glossaryIds: string[];
  claims: { status: ScientificStatus; text: string }[];
  sources: { title: string; url: string; publisher: string; accessed: string }[];
  lastReviewed: string;
};

export type LessonSection = { title: string; markdown: string };
export type Lesson = { meta: LessonMeta; sections: LessonSection[] };

const contentRoot = path.join(process.cwd(), "content");

function lessonFiles() {
  if (!fs.existsSync(contentRoot)) return [];
  return fs.readdirSync(contentRoot, { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".md"));
}

export function getAllLessonSlugs() {
  return lessonFiles().map((file) => path.basename(file, ".md"));
}

export function getLesson(slug: string): Lesson | null {
  const match = lessonFiles().find((file) => path.basename(file, ".md") === slug);
  if (!match) return null;
  const raw = fs.readFileSync(path.join(contentRoot, match), "utf8");
  const parsed = matter(raw);
  const sections: LessonSection[] = [];
  const matches = [...parsed.content.matchAll(/^## (.+)$/gm)];
  matches.forEach((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length;
    const end = matches[index + 1]?.index ?? parsed.content.length;
    sections.push({ title: heading[1].trim(), markdown: parsed.content.slice(start, end).trim() });
  });
  return { meta: parsed.data as LessonMeta, sections };
}
