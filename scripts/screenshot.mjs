// Dev-only visual check tool. Drives the already-installed Chrome via
// puppeteer-core, waits for animations to settle, and writes a PNG.
//
//   node scripts/screenshot.mjs --url=http://localhost:3000/ --out=shot.png
//
// Flags: --url --out --w --h --scroll(px) --wait(ms) --full=true --reduce=true
// Set CHROME_PATH to override the browser location.
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const argv = process.argv.slice(2);
const get = (k, d) => {
  const a = argv.find((x) => x.startsWith(`--${k}=`));
  return a ? a.split("=").slice(1).join("=") : d;
};

const url = get("url", "http://localhost:3000/");
const out = get("out", "shot.png");
const width = parseInt(get("w", "1440"), 10);
const height = parseInt(get("h", "900"), 10);
const scrollY = parseInt(get("scroll", "0"), 10);
const waitMs = parseInt(get("wait", "3500"), 10);
const fullPage = get("full", "false") === "true";
const reduce = get("reduce", "false") === "true";
const seekVideo = parseFloat(get("seekVideo", "0"));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  defaultViewport: { width, height, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
if (reduce) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
}
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

if (scrollY > 0) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
}

// Step-scroll so every whileInView reveal fires before a full-page capture.
if (fullPage) {
  await page.evaluate(async () => {
    const step = 300;
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

// Pause + seek the hero video to a deterministic, content-rich frame.
if (seekVideo > 0) {
  await page.evaluate(async (t) => {
    const v = document.querySelector("video");
    if (!v) return;
    v.loop = false;
    v.pause();
    await new Promise((res) => {
      v.onseeked = res;
      v.currentTime = t;
      setTimeout(res, 2000);
    });
    v.pause(); // hold the frame (autoplay can otherwise resume)
  }, seekVideo);
}

await new Promise((r) => setTimeout(r, waitMs));
await page.screenshot({ path: out, fullPage });
await browser.close();
console.log("WROTE", out);
