import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const browserErrors = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.goto("http://localhost:3000/learn/cosmic-address", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "レッスンを完了" }).click();
  await page.getByRole("button", { name: "完了済み" }).waitFor();
  await page.getByRole("button", { name: "ブックマーク" }).click();
  await page.getByRole("button", { name: "保存済み" }).waitFor();
  await page.getByLabel("自分のノート").fill("宇宙の階層と距離の桁を復習する");
  await page.getByRole("button", { name: "ノートを保存" }).click();

  const stored = await page.evaluate(() => ({ value: localStorage.getItem("astraea:learner:v1"), keys: Object.keys(localStorage) }));
  assert.deepEqual(browserErrors, [], `browser errors: ${browserErrors.join(" | ")}`);
  assert(stored.value, `learner state was not persisted; storage keys: ${stored.keys.join(", ")}`);
  const state = JSON.parse(stored.value);
  assert(state.completed.includes("cosmic-address"), "completed lesson was not persisted");
  assert(state.bookmarks.includes("cosmic-address"), "bookmark was not persisted");
  assert.equal(state.notes["cosmic-address"], "宇宙の階層と距離の桁を復習する");

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.getByText("1 lessons", { exact: true }).waitFor();

  await page.getByRole("button", { name: "教材を検索" }).click();
  await page.getByPlaceholder("例: 光年、赤方偏移、宇宙の住所").fill("光年");
  await page.getByRole("link", { name: /光年/ }).first().waitFor();

  console.log("smoke-check: progress, bookmark, notes, dashboard sync, and search passed");
  await context.close();
} finally {
  await browser.close();
}
