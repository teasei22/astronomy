import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const root = process.cwd();
const contentDir = path.join(root, "content", "level-0");
const tiersPath = path.join(root, "data", "level-0-term-tiers.json");
const glossaryPath = path.join(root, "data", "glossary.ts");
const quizzesPath = path.join(root, "data", "quizzes.ts");

const tiers = JSON.parse(fs.readFileSync(tiersPath, "utf8"));
const glossaryText = fs.readFileSync(glossaryPath, "utf8");
const glossaryIdList = [...glossaryText.matchAll(/\bid:\s*"([^"]+)"/g)].map(
  (match) => match[1],
);
const glossaryIds = new Set(glossaryIdList);
const errors = [];
let assignmentCount = 0;

if (glossaryIdList.length !== glossaryIds.size) {
  errors.push("The glossary contains duplicate ids.");
}

const lessons = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => matter(fs.readFileSync(path.join(contentDir, file), "utf8")).data)
  .sort((a, b) => a.code.localeCompare(b.code));

if (lessons.length !== 18) {
  errors.push(`Level 0 lesson count must be 18, received ${lessons.length}.`);
}

for (const lesson of lessons) {
  const entry = tiers[lesson.slug];
  if (!entry) {
    errors.push(`${lesson.code}: missing term-tier inventory.`);
    continue;
  }
  if (entry.code !== lesson.code) {
    errors.push(`${lesson.code}: inventory code is ${entry.code}.`);
  }

  const classified = [...entry.core, ...entry.supporting, ...entry.advanced];
  const classifiedSet = new Set(classified);
  const lessonIds = lesson.glossaryIds ?? [];
  const lessonSet = new Set(lessonIds);
  assignmentCount += classified.length;

  if (classified.length !== classifiedSet.size) {
    errors.push(`${lesson.code}: a term appears in more than one tier.`);
  }
  if (lessonIds.length !== lessonSet.size) {
    errors.push(`${lesson.code}: glossaryIds contains duplicates.`);
  }

  for (const id of classifiedSet) {
    if (!glossaryIds.has(id)) {
      errors.push(`${lesson.code}: classified term "${id}" is absent from the glossary.`);
    }
    if (!lessonSet.has(id)) {
      errors.push(`${lesson.code}: classified term "${id}" is absent from glossaryIds.`);
    }
  }
  for (const id of lessonSet) {
    if (!classifiedSet.has(id)) {
      errors.push(`${lesson.code}: glossary term "${id}" has no CORE/SUPPORTING/ADVANCED tier.`);
    }
  }
}

for (const slug of Object.keys(tiers)) {
  if (!lessons.some((lesson) => lesson.slug === slug)) {
    errors.push(`Term-tier inventory has unknown lesson "${slug}".`);
  }
}

const quizzesText = fs.readFileSync(quizzesPath, "utf8");
const quizStarts = [...quizzesText.matchAll(/^  "([^"]+)": \[/gm)];
const levelZeroQuizText = quizStarts
  .filter((match) => Object.hasOwn(tiers, match[1]))
  .map((match) => {
    const next = quizStarts.find((candidate) => candidate.index > match.index);
    return quizzesText.slice(match.index, next?.index ?? quizzesText.length);
  })
  .join("\n");
const topicIds = [
  ...levelZeroQuizText.matchAll(/topicIds:\s*\[([^\]]*)\]/g),
].flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((idMatch) => idMatch[1]));

for (const id of new Set(topicIds)) {
  if (!glossaryIds.has(id)) {
    errors.push(`Quiz topic "${id}" is absent from the glossary.`);
  }
}

if (errors.length > 0) {
  console.error("Level 0 terminology audit failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const uniqueAssigned = new Set(
  Object.values(tiers).flatMap((entry) => [...entry.core, ...entry.supporting, ...entry.advanced]),
).size;

console.log(
  `Level 0 terminology audit passed: ${lessons.length}/18 lessons, ${assignmentCount}/${assignmentCount} classified term assignments, ${uniqueAssigned} unique glossary terms.`,
);
