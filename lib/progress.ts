"use client";

import { useSyncExternalStore } from "react";
import type { QuizDimension } from "@/data/quizzes";

export type DimensionScore = { score: number; total: number };

export type QuizAttempt = {
  lessonSlug: string;
  score: number;
  total: number;
  topicIds: string[];
  dimensionScores?: Partial<Record<QuizDimension, DimensionScore>>;
  reviewTopicIds?: string[];
  attemptedAt: string;
};

export type LearnerState = {
  version: 1;
  completed: string[];
  bookmarks: string[];
  notes: Record<string, string>;
  quizAttempts: QuizAttempt[];
  lastVisited?: string;
};

const STORAGE_KEY = "astraea:learner:v1";
export const MASTERY_THRESHOLD = 0.8;
const initialState: LearnerState = {
  version: 1,
  completed: [],
  bookmarks: [],
  notes: {},
  quizAttempts: [],
};

let snapshot = initialState;
let hydrated = false;
const listeners = new Set<() => void>();

function readState() {
  if (hydrated || typeof window === "undefined") return snapshot;
  hydrated = true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    snapshot = stored ? { ...initialState, ...JSON.parse(stored) } : initialState;
  } catch {
    snapshot = initialState;
  }
  return snapshot;
}

function emit(next: LearnerState) {
  snapshot = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLearnerState() {
  return useSyncExternalStore(subscribe, readState, () => initialState);
}

export const progressActions = {
  toggleComplete(slug: string) {
    const state = readState();
    const completed = state.completed.includes(slug)
      ? state.completed.filter((item) => item !== slug)
      : [...state.completed, slug];
    emit({ ...state, completed, lastVisited: slug });
  },
  toggleBookmark(slug: string) {
    const state = readState();
    const bookmarks = state.bookmarks.includes(slug)
      ? state.bookmarks.filter((item) => item !== slug)
      : [...state.bookmarks, slug];
    emit({ ...state, bookmarks });
  },
  saveNote(slug: string, note: string) {
    const state = readState();
    emit({ ...state, notes: { ...state.notes, [slug]: note }, lastVisited: slug });
  },
  saveQuiz(attempt: QuizAttempt) {
    const state = readState();
    emit({ ...state, quizAttempts: [...state.quizAttempts.slice(-49), attempt], lastVisited: attempt.lessonSlug });
  },
  visit(slug: string) {
    const state = readState();
    if (state.lastVisited !== slug) emit({ ...state, lastVisited: slug });
  },
};
