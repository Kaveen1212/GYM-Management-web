import puppeteer from "puppeteer-core";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--use-angle=swiftshader"],
});

async function shot(viewport, targetText, out, offset = -80) {
  const p = await b.newPage();
  await p.setViewport(viewport);
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const y = await p.evaluate((t) => {
    const el = [...document.querySelectorAll("h2,h3,p")].find((e) => e.textContent?.includes(t));
    return el ? window.scrollY + el.getBoundingClientRect().top : -1;
  }, targetText);
  if (y < 0) {
    console.log("NOT FOUND:", targetText);
    await p.close();
    return;
  }
  await p.evaluate((yy) => {
    if (window.lenis) window.lenis.scrollTo(yy, { immediate: true, force: true });
    else window.scrollTo(0, yy);
  }, y + offset);
  await new Promise((r) => setTimeout(r, 1200));
  await p.screenshot({ path: out });
  console.log("WROTE", out);
  await p.close();
}

await shot({ width: 1440, height: 900 }, "Qualifications", "scripts/coach_desktop.png", -60);
await shot({ width: 390, height: 844 }, "Qualifications", "scripts/coach_mobile.png", -60);

await b.close();
