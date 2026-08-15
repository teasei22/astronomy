import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const browserErrors = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.goto("http://localhost:3000/learn/cosmic-address", { waitUntil: "networkidle" });
  const experience = page.locator("section").filter({ hasText: "PREDICT FIRST" }).first();
  await experience.getByRole("button", { name: /太陽系/ }).click();
  await experience.getByRole("button", { name: /もう一段 Zoom Out/ }).click();
  await experience.getByRole("button", { name: /天の川銀河/ }).click();
  await experience.getByRole("button", { name: /もう一段 Zoom Out/ }).click();
  await experience.getByRole("button", { name: /局所銀河群/ }).click();
  await experience.getByRole("button", { name: /もう一段 Zoom Out/ }).click();
  await experience.getByRole("button", { name: /宇宙の網/ }).click();
  await experience.getByRole("button", { name: /もう一段 Zoom Out/ }).click();
  await experience.getByRole("button", { name: /観測可能な宇宙/ }).click();
  for (let index = 0; index < 4; index += 1) await experience.getByRole("button", { name: "証拠を1段見る" }).click();
  await page.getByText("証拠の鎖がつながりました。予想と照らし合わせてから解説へ進みます。").waitFor();

  const lockedCompletion = page.getByRole("button", { name: "修了判定 80% が必要" });
  await lockedCompletion.waitFor();
  assert(await lockedCompletion.isDisabled(), "completion should be locked before mastery");

  await page.getByRole("button", { name: "B 天の川銀河", exact: true }).click();
  await page.getByRole("button", { name: /A 地球 → 太陽系 → 天の川銀河 → 局所銀河群/ }).click();
  await page.getByRole("button", { name: "A すぐ吸い込まれる", exact: true }).click();
  await page.getByRole("button", { name: "B 地球と太陽の距離が最も大きい", exact: true }).click();
  await page.getByRole("button", { name: /B 恒星円盤・ガス・暗黒物質など/ }).click();
  await page.getByRole("button", { name: "採点する" }).click();
  await page.getByText("合格です。レッスンを完了できます。").waitFor();
  await page.getByText("NEXT REVIEW · 推論").waitFor();
  assert.equal(await page.getByRole("meter").count(), 4, "four diagnostic dimensions should be shown");
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
  assert.equal(state.quizAttempts.at(-1)?.score, 4, "80 percent mastery result was not persisted");
  assert.equal(state.quizAttempts.at(-1)?.dimensionScores?.Data?.total, 1, "diagnostic dimensions were not persisted");
  assert.equal(state.quizAttempts.at(-1)?.dimensionScores?.Reasoning?.score, 0, "weak diagnostic dimension was not persisted");
  assert(state.bookmarks.includes("cosmic-address"), "bookmark was not persisted");
  assert.equal(state.notes["cosmic-address"], "宇宙の階層と距離の桁を復習する");

  await page.goto("http://localhost:3000/learn/how-astronomy-knows", { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "触れずに、なぜ分かる？" }).waitFor();
  await page.getByText("グラフのへこみから、どこまで言える？", { exact: true }).waitFor();
  await page.getByRole("heading", { name: "練習問題の解答", exact: true }).waitFor();
  await page.getByRole("heading", { name: "発展問題の解答", exact: true }).waitFor();
  const lessonGlossary = page.locator("section[aria-labelledby='lesson-glossary-title']");
  await lessonGlossary.getByText("ナノメートル", { exact: true }).waitFor();
  await lessonGlossary.getByText("吸収線", { exact: true }).waitFor();
  await lessonGlossary.getByText("校正", { exact: true }).waitFor();
  assert.equal(await page.getByText("恒星の明るさが周期的に1%下がりました。", { exact: true }).count(), 0, "unintroduced exoplanet scenario should be removed");

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.getByText("1 lessons", { exact: true }).waitFor();
  await page.getByRole("heading", { name: "理解プロフィール" }).waitFor();
  await page.getByText("推論を補強").waitFor();
  assert.equal(await page.getByRole("meter").count(), 4, "dashboard should aggregate diagnostic dimensions");

  await page.getByRole("button", { name: "教材を検索" }).click();
  await page.getByPlaceholder("例: 光年、赤方偏移、宇宙の住所").fill("光年");
  await page.getByRole("link", { name: /光年/ }).first().waitFor();

  await page.goto("http://localhost:3000/roadmap", { waitUntil: "networkidle" });
  await page.locator("#level-4 > button").click();
  await page.getByText("HR図を読み、恒星の色・温度・光度・半径の関係を説明できる", { exact: true }).waitFor();
  await page.getByText("数学: 対数・指数関数・微分", { exact: true }).waitFor();
  await page.locator("#level-7 > button").click();
  await page.getByText("Course 7B · Computational Astronomy", { exact: true }).waitFor();
  await page.getByText("Course 7E · Capstone", { exact: true }).waitFor();
  await page.getByRole("heading", { name: "ASTRAEAが「学部相当」と呼ぶ条件" }).waitFor();
  assert.equal(await page.getByRole("meter", { name: /公開進捗/ }).count(), 8, "roadmap should show publication progress for every level");

  console.log("smoke-check: learning flow, beginner terminology, worked answers, diagnosis, curriculum, progress, and search passed");
  await context.close();
} finally {
  await browser.close();
}
