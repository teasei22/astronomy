"use client";

import { useState } from "react";
import { glossaryById } from "@/data/glossary";

export function GlossaryTerm({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const entry = glossaryById[id];
  if (!entry) return null;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="border-b border-dotted border-[var(--cyan)] text-left text-[#d9f5f1]"
        aria-expanded={open}
      >
        {entry.termJa}
      </button>
      {open && (
        <span role="tooltip" className="absolute bottom-full left-0 z-30 mb-2 block w-72 border border-[#46535a] bg-[#0c1012] p-3 text-left shadow-xl">
          <span className="block text-xs font-semibold text-white">{entry.termJa}</span>
          <span className="mt-0.5 block text-[11px] text-[var(--cyan)]">{entry.termEn}{entry.abbr ? ` · ${entry.abbr}` : ""}</span>
          <span className="mt-2 block text-xs leading-5 text-[#c3ccca]">{entry.definition}</span>
        </span>
      )}
    </span>
  );
}
