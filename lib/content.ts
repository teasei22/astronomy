import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { glossaryById } from "@/data/glossary";
import { lessonExperiences } from "@/data/lesson-experiences";
import { quizzes } from "@/data/quizzes";
import { skillBridges } from "@/data/skill-bridges";

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
  const slugs = lessonFiles().map((file) => path.basename(file, ".md"));
  const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicate) throw new Error(`Duplicate lesson slug: ${duplicate}`);
  return slugs;
}

function validateMeta(data: unknown, file: string): LessonMeta {
  if (!data || typeof data !== "object") throw new Error(`${file}: frontmatter is required`);
  const meta = data as Partial<LessonMeta>;
  const strings: (keyof LessonMeta)[] = ["slug", "code", "module", "title", "titleEn", "summary", "lastReviewed"];
  for (const key of strings) {
    if (typeof meta[key] !== "string" || !meta[key]) throw new Error(`${file}: ${key} is required`);
  }
  if (!Number.isInteger(meta.level) || !Number.isFinite(meta.duration)) throw new Error(`${file}: level and duration must be numbers`);
  for (const key of ["outcomes", "prerequisites", "glossaryIds", "claims", "sources"] as const) {
    if (!Array.isArray(meta[key])) throw new Error(`${file}: ${key} must be an array`);
  }
  for (const source of meta.sources ?? []) {
    if (!source.title || !source.publisher || !source.accessed || !source.url) throw new Error(`${file}: every source requires title, publisher, accessed, and url`);
    try {
      new URL(source.url);
    } catch {
      throw new Error(`${file}: invalid source URL ${source.url}`);
    }
  }
  const glossaryIds = meta.glossaryIds ?? [];
  const duplicateGlossaryId = glossaryIds.find((id, index) => glossaryIds.indexOf(id) !== index);
  if (duplicateGlossaryId) throw new Error(`${file}: duplicate glossary id ${duplicateGlossaryId}`);
  for (const id of glossaryIds) {
    if (!glossaryById[id]) throw new Error(`${file}: unknown glossary id ${id}`);
  }
  return meta as LessonMeta;
}

function validateUniversityContract(meta: LessonMeta, sections: LessonSection[], file: string) {
  const standardizedLevel1Modules = new Set(["天文学という科学", "対象別の専門分野"]);
  const isStandardizedLevel1 = meta.level === 1 && standardizedLevel1Modules.has(meta.module);
  if (meta.level === 0 || isStandardizedLevel1) {
    const contractName = meta.level === 0 ? "Level 0" : "Level 1";
    const questions = quizzes[meta.slug] ?? [];
    if (!lessonExperiences[meta.slug]) throw new Error(`${file}: ${contractName} lessons require a predict-first experience`);
    if (questions.length < 5) throw new Error(`${file}: ${contractName} lessons require at least 5 diagnostic questions`);
    for (const dimension of ["Recall", "Concept", "Reasoning", "Data"] as const) {
      if (!questions.some((question) => question.type === dimension)) throw new Error(`${file}: ${contractName} lesson is missing ${dimension} diagnosis`);
    }
  }
  if (meta.level === 0) {
    for (const required of ["練習問題", "練習問題の解答", "発展問題", "発展問題の解答"]) {
      if (!sections.some((section) => section.title === required)) throw new Error(`${file}: Level 0 lesson is missing ${required}`);
    }
  }
  if (isStandardizedLevel1) {
    const scope = sections.find((section) => section.title === "このLevelで求める理解");
    if (!scope || !["Required Now", "Preview Only", "Returns In"].every((label) => scope.markdown.includes(label))) {
      throw new Error(`${file}: Level 1 requires Required Now / Preview Only / Returns In`);
    }
    for (const required of ["独力演習", "独力演習の解答"]) {
      if (!sections.some((section) => section.title === required)) throw new Error(`${file}: Level 1 lesson is missing ${required}`);
    }
  }
  if (meta.level < 2) return;
  if (!skillBridges[meta.slug]) throw new Error(`${file}: Level 2+ lessons require a just-in-time math bridge`);
  if (meta.outcomes.length < 4) throw new Error(`${file}: Level 2+ lessons require at least 4 outcomes`);
  if (meta.sources.length < 2) throw new Error(`${file}: Level 2+ lessons require at least 2 sources`);
  for (const required of ["合格条件", "独力演習", "演習解答"]) {
    if (!sections.some((section) => section.title.includes(required))) throw new Error(`${file}: missing required section ${required}`);
  }
  const questions = quizzes[meta.slug] ?? [];
  if (questions.length < 6) throw new Error(`${file}: Level 2+ lessons require at least 6 mastery questions`);
  const quantitative = questions.filter((question) => question.kind === "numeric" || question.type === "Data").length;
  if (quantitative < 2) throw new Error(`${file}: Level 2+ lessons require at least 2 numeric or data questions`);
}

export function getLesson(slug: string): Lesson | null {
  const match = lessonFiles().find((file) => path.basename(file, ".md") === slug);
  if (!match) return null;
  const raw = fs.readFileSync(path.join(contentRoot, match), "utf8");
  const parsed = matter(raw);
  const meta = validateMeta(parsed.data, match);
  const sections: LessonSection[] = [];
  const matches = [...parsed.content.matchAll(/^## (.+)$/gm)];
  matches.forEach((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length;
    const end = matches[index + 1]?.index ?? parsed.content.length;
    sections.push({ title: heading[1].trim(), markdown: parsed.content.slice(start, end).trim() });
  });
  validateUniversityContract(meta, sections, match);
  return { meta, sections };
}
