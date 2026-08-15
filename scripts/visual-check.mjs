import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const outputDir = "artifacts/visual";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
const cases = [
  { name: "home-desktop", url: "http://localhost:3000/", viewport: { width: 1440, height: 1000 } },
  { name: "home-mobile", url: "http://localhost:3000/", viewport: { width: 390, height: 844 } },
  { name: "lesson-desktop", url: "http://localhost:3000/learn/cosmic-address", viewport: { width: 1440, height: 1000 } },
  { name: "scale-mobile", url: "http://localhost:3000/explore/scale", viewport: { width: 390, height: 844 } },
];

const report = [];
try {
  for (const testCase of cases) {
    const context = await browser.newContext({ viewport: testCase.viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(testCase.url, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${outputDir}/${testCase.name}.png`, fullPage: false });
    const metrics = await page.evaluate(() => {
      const images = [...document.images];
      const candidates = [...document.querySelectorAll("button, a, h1, h2, h3")];
      const overflow = candidates
        .filter((element) => element.scrollWidth > element.clientWidth + 2)
        .slice(0, 8)
        .map((element) => ({ tag: element.tagName, text: element.textContent?.trim().slice(0, 80), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
      return {
        title: document.title,
        viewportWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        unloadedImages: images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc),
        overflow,
      };
    });
    report.push({ name: testCase.name, ...metrics });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(report, null, 2));

if (report.some((item) => item.bodyScrollWidth > item.viewportWidth + 2 || item.unloadedImages.length > 0 || item.overflow.length > 0)) {
  process.exitCode = 1;
}
