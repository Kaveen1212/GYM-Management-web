import puppeteer from "puppeteer-core";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const b = await puppeteer.launch({ executablePath: CHROME, headless:"new", args:["--no-sandbox","--hide-scrollbars","--use-angle=swiftshader"], defaultViewport:{width:1440,height:900} });
const p = await b.newPage();
await p.goto("http://localhost:3000/", { waitUntil:"networkidle2", timeout:60000 });
await new Promise(r=>setTimeout(r,2500));
const y = await p.evaluate(()=>{
  const ps=[...document.querySelectorAll("p")];
  const el=ps.find(e=>e.textContent.includes("coaching studio"));
  if(!el) return -1;
  const r=el.getBoundingClientRect();
  return window.scrollY + r.top - 160;
});
console.log("y=",y);
if(y>=0){
  await p.evaluate((yy)=>{ if(window.lenis) window.lenis.scrollTo(yy,{immediate:true,force:true}); else window.scrollTo(0,yy); }, y);
  await new Promise(r=>setTimeout(r,1300));
  await p.screenshot({ path:"scripts/textscroll.png" });
  console.log("WROTE textscroll.png");
}
await b.close();
