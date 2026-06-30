import puppeteer from "puppeteer-core";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const targets = [
  ["Everything you need to train", "scripts/sec_features.png", -110],
  ["How the coaching works", "scripts/sec_process.png", -90],
  ["occasional kick", "scripts/sec_newsletter.png", -150],
];
const b = await puppeteer.launch({ executablePath: CHROME, headless:"new", args:["--no-sandbox","--hide-scrollbars","--use-angle=swiftshader"], defaultViewport:{width:1440,height:900} });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil:"networkidle2", timeout:60000 });
await new Promise(r=>setTimeout(r,2500));
for (const [text,out,off] of targets){
  const y = await p.evaluate((t)=>{
    const el=[...document.querySelectorAll("h2,p,section")].find(e=>e.textContent && e.textContent.includes(t));
    if(!el) return -1;
    return window.scrollY + el.getBoundingClientRect().top;
  }, text);
  if(y<0){ console.log("NOT FOUND:", text); continue; }
  await p.evaluate((yy)=>{ if(window.lenis) window.lenis.scrollTo(yy,{immediate:true,force:true}); else window.scrollTo(0,yy); }, y+off);
  await new Promise(r=>setTimeout(r,1500));
  await p.screenshot({ path: out });
  console.log("WROTE", out);
}
await b.close();
