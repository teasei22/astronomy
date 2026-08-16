import { glossaryById, type GlossaryEntry } from "@/data/glossary";
import type { LessonSection } from "@/lib/content";

type MarkdownNode = {
  type: string;
  value?: string;
  children?: MarkdownNode[];
  url?: string;
  title?: string;
};

type GlossaryCandidate = {
  id: string;
  label: string;
  termJa: string;
};

const skippedNodeTypes = new Set([
  "code",
  "definition",
  "heading",
  "html",
  "inlineCode",
  "inlineMath",
  "link",
  "linkReference",
  "math",
]);

function labelsFor(entry: GlossaryEntry) {
  return [...new Set([entry.termJa, entry.termEn, entry.abbr, ...(entry.aliases ?? [])].filter((label): label is string => Boolean(label?.trim())).map((label) => label.trim()))];
}

function candidatesFor(ids: string[]) {
  return ids
    .flatMap((id) => {
      const entry = glossaryById[id];
      if (!entry) return [];
      return labelsFor(entry).map((label) => ({ id, label, termJa: entry.termJa }));
    })
    .sort((left, right) => right.label.length - left.label.length);
}

function isAsciiWordCharacter(character: string | undefined) {
  return character ? /[A-Za-z0-9]/.test(character) : false;
}

function isWholeLabel(text: string, index: number, label: string) {
  const first = label[0];
  const last = label[label.length - 1];
  if (isAsciiWordCharacter(first) && isAsciiWordCharacter(text[index - 1])) return false;
  if (isAsciiWordCharacter(last) && isAsciiWordCharacter(text[index + label.length])) return false;
  return true;
}

function findNextCandidate(text: string, candidates: GlossaryCandidate[], usedIds: Set<string>, fromIndex = 0) {
  let best: { candidate: GlossaryCandidate; index: number } | null = null;

  for (const candidate of candidates) {
    if (usedIds.has(candidate.id)) continue;
    let index = text.indexOf(candidate.label, fromIndex);
    while (index !== -1 && !isWholeLabel(text, index, candidate.label)) {
      index = text.indexOf(candidate.label, index + candidate.label.length);
    }
    if (index === -1) continue;
    if (!best || index < best.index || (index === best.index && candidate.label.length > best.candidate.label.length)) {
      best = { candidate, index };
    }
  }

  return best;
}

function containsCandidate(markdown: string, candidate: GlossaryCandidate) {
  let index = markdown.indexOf(candidate.label);
  while (index !== -1) {
    if (isWholeLabel(markdown, index, candidate.label)) return true;
    index = markdown.indexOf(candidate.label, index + candidate.label.length);
  }
  return false;
}

export function assignGlossaryIdsToSections(sections: LessonSection[], ids: string[]) {
  const remainingIds = new Set(ids);
  const candidates = candidatesFor(ids);

  return sections.map((section) => {
    const sectionIds = ids.filter((id) => remainingIds.has(id) && candidates.some((candidate) => candidate.id === id && containsCandidate(section.markdown, candidate)));
    sectionIds.forEach((id) => remainingIds.delete(id));
    return sectionIds;
  });
}

export function createGlossaryLinkPlugin(ids: string[]) {
  const candidates = candidatesFor(ids);

  return function glossaryLinkPlugin() {
    return function transform(tree: MarkdownNode) {
      const usedIds = new Set<string>();

      function visit(parent: MarkdownNode) {
        if (!parent.children || skippedNodeTypes.has(parent.type)) return;

        for (let index = 0; index < parent.children.length; index += 1) {
          const child = parent.children[index];
          if (child.type !== "text" || !child.value) {
            visit(child);
            continue;
          }

          const replacement: MarkdownNode[] = [];
          let cursor = 0;
          let match = findNextCandidate(child.value, candidates, usedIds, cursor);

          while (match) {
            if (match.index > cursor) replacement.push({ type: "text", value: child.value.slice(cursor, match.index) });
            replacement.push({
              type: "link",
              url: `/glossary#${match.candidate.id}`,
              title: `用語集で「${match.candidate.termJa}」を見る`,
              children: [{ type: "text", value: match.candidate.label }],
            });
            usedIds.add(match.candidate.id);
            cursor = match.index + match.candidate.label.length;
            match = findNextCandidate(child.value, candidates, usedIds, cursor);
          }

          if (replacement.length === 0) continue;
          if (cursor < child.value.length) replacement.push({ type: "text", value: child.value.slice(cursor) });
          parent.children.splice(index, 1, ...replacement);
          index += replacement.length - 1;
        }
      }

      visit(tree);
    };
  };
}
