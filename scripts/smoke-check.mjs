import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const browserErrors = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.goto("http://localhost:3000/learn/cosmic-address", { waitUntil: "networkidle" });
  const lockedCompletion = page.getByRole("button", { name: "修了判定 80% が必要" });
  await lockedCompletion.waitFor();
  assert(await lockedCompletion.isDisabled(), "completion should be locked before mastery");

  await page.getByRole("button", { name: "B 天の川銀河", exact: true }).click();
  await page.getByRole("button", { name: /A 地球 → 太陽系 → 天の川銀河 → 局所銀河群/ }).click();
  await page.getByRole("button", { name: "B ほぼ同じ軌道を続ける", exact: true }).click();
  await page.getByRole("button", { name: "B 10⁵倍", exact: true }).click();
  await page.getByRole("button", { name: "採点する" }).click();
  await page.getByText("合格です。レッスンを完了できます。").waitFor();
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
  assert.equal(state.quizAttempts.at(-1)?.score, 4, "mastery result was not persisted");
  assert(state.bookmarks.includes("cosmic-address"), "bookmark was not persisted");
  assert.equal(state.notes["cosmic-address"], "宇宙の階層と距離の桁を復習する");

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.getByText("1 lessons", { exact: true }).waitFor();

  await page.getByRole("button", { name: "教材を検索" }).click();
  await page.getByPlaceholder("例: 光年、赤方偏移、宇宙の住所").fill("光年");
  await page.getByRole("link", { name: /光年/ }).first().waitFor();

  console.log("smoke-check: mastery gate, progress, bookmark, notes, dashboard sync, and search passed");
  await context.close();
} finally {
  await browser.close();
}
