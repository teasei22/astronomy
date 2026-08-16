import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const outputDir = "artifacts/visual";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
const cases = [
  { name: "home-desktop", url: "http://localhost:3000/", viewport: { width: 1440, height: 1000 } },
  { name: "home-mobile", url: "http://localhost:3000/", viewport: { width: 390, height: 844 } },
  { name: "lesson-desktop", url: "http://localhost:3000/learn/cosmic-address", viewport: { width: 1440, height: 1000 } },
  { name: "lesson-mobile", url: "http://localhost:3000/learn/cosmic-address", viewport: { width: 390, height: 844 } },
  { name: "course0a-lesson-mobile", url: "http://localhost:3000/learn/edge-of-solar-system", viewport: { width: 390, height: 844 } },
  { name: "course0b-units-mobile", url: "http://localhost:3000/learn/parsec-and-prefixes", viewport: { width: 390, height: 844 } },
  { name: "course0b-timeline-desktop", url: "http://localhost:3000/learn/cosmic-history-timeline", viewport: { width: 1440, height: 1000 } },
  { name: "course0c-confidence-desktop", url: "http://localhost:3000/learn/levels-of-scientific-confidence", viewport: { width: 1440, height: 1000 } },
  { name: "course0c-big-bang-mobile", url: "http://localhost:3000/learn/big-bang-without-a-center", viewport: { width: 390, height: 844 } },
  { name: "spectrum-lesson-desktop", url: "http://localhost:3000/learn/how-astronomy-knows", viewport: { width: 1440, height: 1000 } },
  { name: "spectrum-glossary-mobile", url: "http://localhost:3000/learn/how-astronomy-knows#lesson-glossary-title", viewport: { width: 390, height: 844 } },
  { name: "course1a-map-desktop", url: "http://localhost:3000/learn/map-of-astronomy", viewport: { width: 1440, height: 1000 } },
  { name: "course1a-observation-mobile", url: "http://localhost:3000/learn/observational-astronomy", viewport: { width: 390, height: 844 } },
  { name: "course1a-theory-desktop", url: "http://localhost:3000/learn/theoretical-astronomy", viewport: { width: 1440, height: 1000 } },
  { name: "course1a-computation-mobile", url: "http://localhost:3000/learn/computational-astronomy", viewport: { width: 390, height: 844 } },
  { name: "course1b-planets-desktop", url: "http://localhost:3000/learn/planetary-science-and-astrobiology", viewport: { width: 1440, height: 1000 } },
  { name: "course1b-stars-mobile", url: "http://localhost:3000/learn/stars-and-interstellar-medium", viewport: { width: 390, height: 844 } },
  { name: "course1b-galaxies-desktop", url: "http://localhost:3000/learn/galaxies-and-cosmology", viewport: { width: 1440, height: 1000 } },
  { name: "course1b-messengers-mobile", url: "http://localhost:3000/learn/high-energy-and-multi-messenger-astronomy", viewport: { width: 390, height: 844 } },
  { name: "course1c-history-desktop", url: "http://localhost:3000/learn/history-of-evidence", viewport: { width: 1440, height: 1000 } },
  { name: "course1c-surveys-mobile", url: "http://localhost:3000/learn/multiwavelength-surveys-and-space-telescopes", viewport: { width: 390, height: 844 } },
  { name: "course1c-three-methods-desktop", url: "http://localhost:3000/learn/one-phenomenon-three-methods", viewport: { width: 1440, height: 1000 } },
  { name: "course1c-method-choice-mobile", url: "http://localhost:3000/learn/choosing-methods-for-astronomy-questions", viewport: { width: 390, height: 844 } },
  { name: "course2a-horizon-mobile", url: "http://localhost:3000/learn/horizon-coordinates-and-daily-motion", viewport: { width: 390, height: 844 } },
  { name: "course2a-time-desktop", url: "http://localhost:3000/learn/astronomical-time-and-epoch", viewport: { width: 1440, height: 1000 } },
  { name: "course2a-distance-desktop", url: "http://localhost:3000/learn/standard-candles-and-rulers", viewport: { width: 1440, height: 1000 } },
  { name: "course2a-bias-mobile", url: "http://localhost:3000/learn/distance-uncertainty-and-bias", viewport: { width: 390, height: 844 } },
  { name: "glossary-target-mobile", url: "http://localhost:3000/glossary#heliopause", viewport: { width: 390, height: 844 } },
  { name: "roadmap-desktop", url: "http://localhost:3000/roadmap", viewport: { width: 1440, height: 1000 } },
  { name: "roadmap-mobile", url: "http://localhost:3000/roadmap", viewport: { width: 390, height: 844 } },
  { name: "standard-desktop", url: "http://localhost:3000/roadmap#standard-heading", viewport: { width: 1440, height: 1000 } },
  { name: "standard-mobile", url: "http://localhost:3000/roadmap#standard-heading", viewport: { width: 390, height: 844 } },
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
