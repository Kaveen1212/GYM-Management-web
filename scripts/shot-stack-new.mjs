import puppeteer from "puppeteer-core";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox","--hide-scrollbars","--use-gl=angle","--use-angle=swiftshader"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise(r=>setTimeout(r,2500));
const info = await page.evaluate(()=>{const s=document.getElementById("programs");const r=s.getBoundingClientRect();return {top:window.scrollY+r.top,height:s.offsetHeight,vh:window.innerHeight};});
const count=4, range=info.height-info.vh;
for(let i=0;i<count;i++){
  const y=Math.round(info.top+(range*i)/(count-1))+4;
  await page.evaluate((yy)=>{ if(window.lenis) window.lenis.scrollTo(yy,{immediate:true,force:true}); else window.scrollTo(0,yy); }, y);
  await new Promise(r=>setTimeout(r,900));
  await page.screenshot({ path:`scripts/newh_${i}.png` });
  console.log("WROTE", `newh_${i}.png`,"@",y);
}
await browser.close();
