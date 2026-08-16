import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const root = process.cwd();
const contentDir = path.join(root, "content", "level-1");
const tiers = JSON.parse(fs.readFileSync(path.join(root, "data", "level-1-term-tiers.json"), "utf8"));
const glossaryText = fs.readFileSync(path.join(root, "data", "glossary.ts"), "utf8");
const quizzesText = fs.readFileSync(path.join(root, "data", "quizzes.ts"), "utf8");
const glossaryIdList = [...glossaryText.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
const glossaryIds = new Set(glossaryIdList);
const errors = [];
let assignmentCount = 0;

if (glossaryIdList.length !== glossaryIds.size) errors.push("The glossary contains duplicate ids.");

const lessons = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => matter(fs.readFileSync(path.join(contentDir, file), "utf8")).data)
  .filter((lesson) => lesson.module === "天文学という科学")
  .sort((a, b) => a.code.localeCompare(b.code));

if (lessons.length !== 4) errors.push(`Course 1A lesson count must be 4, received ${lessons.length}.`);

for (const lesson of lessons) {
  const entry = tiers[lesson.slug];
  if (!entry) {
    errors.push(`${lesson.code}: missing term-tier inventory.`);
    continue;
  }
  if (entry.code !== lesson.code) errors.push(`${lesson.code}: inventory code is ${entry.code}.`);

  const classified = [...entry.core, ...entry.supporting, ...entry.advanced];
  const classifiedSet = new Set(classified);
  const lessonIds = lesson.glossaryIds ?? [];
  const lessonSet = new Set(lessonIds);
  assignmentCount += classified.length;

  if (classified.length !== classifiedSet.size) errors.push(`${lesson.code}: a term appears in more than one tier.`);
  if (lessonIds.length !== lessonSet.size) errors.push(`${lesson.code}: glossaryIds contains duplicates.`);

  for (const id of classifiedSet) {
    if (!glossaryIds.has(id)) errors.push(`${lesson.code}: classified term "${id}" is absent from the glossary.`);
    if (!lessonSet.has(id)) errors.push(`${lesson.code}: classified term "${id}" is absent from glossaryIds.`);
  }
  for (const id of lessonSet) {
    if (!classifiedSet.has(id)) errors.push(`${lesson.code}: glossary term "${id}" has no CORE/SUPPORTING/ADVANCED tier.`);
  }
}

for (const slug of Object.keys(tiers)) {
  if (!lessons.some((lesson) => lesson.slug === slug)) errors.push(`Term-tier inventory has unknown lesson "${slug}".`);
}

const quizStarts = [...quizzesText.matchAll(/^  "([^"]+)": \[/gm)];
const courseQuizText = quizStarts
  .filter((match) => Object.hasOwn(tiers, match[1]))
  .map((match) => {
    const next = quizStarts.find((candidate) => candidate.index > match.index);
    return quizzesText.slice(match.index, next?.index ?? quizzesText.length);
  })
  .join("\n");
const topicIds = [...courseQuizText.matchAll(/topicIds:\s*\[([^\]]*)\]/g)]
  .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((idMatch) => idMatch[1]));

for (const id of new Set(topicIds)) {
  if (!glossaryIds.has(id)) errors.push(`Quiz topic "${id}" is absent from the glossary.`);
}

if (errors.length > 0) {
  console.error("Course 1A terminology audit failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const uniqueAssigned = new Set(
  Object.values(tiers).flatMap((entry) => [...entry.core, ...entry.supporting, ...entry.advanced]),
).size;

console.log(
  `Course 1A terminology audit passed: ${lessons.length}/4 lessons, ${assignmentCount}/${assignmentCount} classified term assignments, ${uniqueAssigned} unique glossary terms.`,
);
