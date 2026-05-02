import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

chromium.use(stealth());

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const query = 'site:jobs.ashbyhq.com OR site:boards.greenhouse.io "Senior" ("Frontend" OR "Full Stack" OR "React")';
  const encodedQuery = encodeURIComponent(query);
  
  await page.goto(`https://www.google.com/search?q=${encodedQuery}`);
  await page.waitForTimeout(2000);
  
  const links = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('a').forEach(a => {
      const h3 = a.querySelector('h3');
      if (h3 && a.href && (a.href.includes('ashbyhq') || a.href.includes('greenhouse'))) {
        results.push({ title: h3.innerText, url: a.href });
      }
    });
    return results;
  });
  
  console.log(`Found ${links.length} results from Google.`);
  
  const pipeline = fs.readFileSync('data/pipeline.md', 'utf8');
  let newAdded = 0;
  let toAppend = "\n## From WebSearch (Google)\n";
  const uniqueUrls = new Set();
  
  for (const r of links) {
     if (!pipeline.includes(r.url) && !uniqueUrls.has(r.url)) {
         let company = "Unknown";
         if (r.title.includes(' at ')) company = r.title.split(' at ')[1].split('|')[0].trim();
         else if (r.title.includes(' @ ')) company = r.title.split(' @ ')[1].split('|')[0].trim();
         else if (r.title.includes('-')) company = r.title.split('-').pop().trim();
         
         toAppend += `- [ ] ${r.url} | ${company} | ${r.title.split(' at ')[0].split(' @ ')[0].trim()}\n`;
         newAdded++;
         uniqueUrls.add(r.url);
     }
  }
  
  if (newAdded > 0) {
      fs.appendFileSync('data/pipeline.md', toAppend);
      console.log(`\nAdded ${newAdded} new jobs to data/pipeline.md from WebSearch!`);
  } else {
      console.log(`\nNo new jobs found from WebSearch.`);
  }
  
  await browser.close();
}
run();
