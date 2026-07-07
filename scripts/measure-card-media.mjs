import puppeteer from "puppeteer-core";
import { execSync } from "node:child_process";

// Reuse the same "new headless" launch the stacking section needs for GSAP
// transforms to actually paint (see shot-stack-new.mjs) — not needed for
// measurement (getBoundingClientRect works either way) but kept consistent.
function findChrome() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  ];
  for (const c of candidates) {
    try {
      execSync(`if exist "${c}" (exit 0) else (exit 1)`, { shell: "cmd.exe" });
      return c;
    } catch {}
  }
  return candidates[0];
}

const viewports = [
  { name: "iPhone-SE-375", width: 375, height: 667 },
  { name: "common-android-360", width: 360, height: 800 },
  { name: "iPhone-12-390", width: 390, height: 844 },
];

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: findChrome(),
  args: ["--use-angle=swiftshader"],
});

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/#programs", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 800));

  const rects = await page.evaluate(() => {
    const toPlain = (r) => (r ? { width: r.width, height: r.height } : null);
    const cards = Array.from(document.querySelectorAll(".stack-card"));
    if (!cards.length) return null;
    const card = cards[0];
    const cardRect = toPlain(card.getBoundingClientRect());
    const mediaEl = card.querySelector(".stack-img")?.parentElement;
    const mediaRect = toPlain(mediaEl ? mediaEl.getBoundingClientRect() : null);
    return { cardRect, mediaRect };
  });

  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`);
  if (!rects || !rects.mediaRect) {
    console.log("  Could not find .stack-card / media panel");
  } else {
    const { width, height } = rects.mediaRect;
    console.log(`  card:  ${rects.cardRect.width.toFixed(0)} x ${rects.cardRect.height.toFixed(0)}`);
    console.log(`  media: ${width.toFixed(0)} x ${height.toFixed(0)}  ratio ${(width / height).toFixed(3)}:1`);
  }
  await page.close();
}

await browser.close();
