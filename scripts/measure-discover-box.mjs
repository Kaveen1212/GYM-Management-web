import puppeteer from "puppeteer-core";

const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1440", width: 1440, height: 900 },
  { name: "wide-1920", width: 1920, height: 1080 },
];

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--use-angle=swiftshader"],
});

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 500));

  const rect = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h3"));
    const target = headings.find((h) => h.textContent?.trim() === "Workout runner");
    const card = target?.closest(".group");
    const visual = card?.querySelector(".grain")?.parentElement;
    if (!visual) return null;
    const r = visual.getBoundingClientRect();
    return { width: r.width, height: r.height };
  });

  console.log(`${vp.name} (${vp.width}px): `, rect ? `${rect.width.toFixed(0)} x ${rect.height.toFixed(0)}  ratio ${(rect.width / rect.height).toFixed(2)}:1` : "not found");
  await page.close();
}

await browser.close();
