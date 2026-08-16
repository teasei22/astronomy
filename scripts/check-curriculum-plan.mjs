import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const curriculumMarkdown = fs.readFileSync(path.join(root, "CURRICULUM.md"), "utf8");
const curriculumData = fs.readFileSync(path.join(root, "data", "curriculum.ts"), "utf8");

const headings = [...curriculumMarkdown.matchAll(/^## LEVEL ([0-7])\b.*$/gm)];
assert.equal(headings.length, 8, "CURRICULUM.md must contain exactly one heading for every Level 0-7");

const plannedByLevel = new Map();
const allIds = [];
for (const [index, heading] of headings.entries()) {
  const level = Number(heading[1]);
  const start = heading.index + heading[0].length;
  const end = headings[index + 1]?.index ?? curriculumMarkdown.length;
  const block = curriculumMarkdown.slice(start, end);
  const ids = [...block.matchAll(/^\s+- (?:Bridge )?((?:L\d-\d{2})|(?:[MP]\d-\d{2})|(?:LAB-\d{2})|(?:CAP-[A-Z]))(?:\s|$)/gm)].map((match) => match[1]);
  assert(ids.length > 0, `Level ${level} has no planned learning units`);
  plannedByLevel.set(level, ids);
  allIds.push(...ids);
}

const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicateIds)], [], `duplicate curriculum ids: ${[...new Set(duplicateIds)].join(", ")}`);

const declaredCounts = new Map(
  [...curriculumData.matchAll(/^\s{4}level: ([0-7]),[\s\S]*?^\s{4}lessonCount: (\d+),/gm)].map((match) => [Number(match[1]), Number(match[2])]),
);
assert.equal(declaredCounts.size, 8, "data/curriculum.ts must declare lessonCount for every Level 0-7");

for (const [level, ids] of plannedByLevel) {
  assert.equal(declaredCounts.get(level), ids.length, `Level ${level} declares ${declaredCounts.get(level)} units but CURRICULUM.md contains ${ids.length}`);
}

const availableCodes = [...curriculumData.matchAll(/\{ slug: "[^"]+", code: "([^"]+)"/g)].map((match) => match[1]);
for (const code of availableCodes) {
  assert(allIds.includes(code), `available lesson ${code} is absent from CURRICULUM.md`);
}

const total = allIds.length;
const breakdown = [...plannedByLevel].map(([level, ids]) => `L${level}=${ids.length}`).join(", ");
console.log(`Curriculum plan check passed: ${total} unique learning units (${breakdown}); all available lesson codes are planned.`);
