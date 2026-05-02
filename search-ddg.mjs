import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import yaml from 'js-yaml';

chromium.use(stealth());

async function run() {
  const config = yaml.load(fs.readFileSync('portals.yml', 'utf8'));
  const queries = config.search_queries.filter(q => q.enabled);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = [];

  for (const q of queries) {
    console.log(`Searching for: ${q.name}`);
    const encodedQuery = encodeURIComponent(q.query);
    await page.goto(`https://html.duckduckgo.com/html/?q=${encodedQuery}`);
    
    // Extract results
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.result__a')).map(a => {
        return { title: a.innerText, url: a.href };
      });
    });
    
    console.log(`Found ${links.length} results.`);
    links.forEach(l => {
      // Basic filtering
      const t = l.title.toLowerCase();
      const pos = ["frontend", "front-end", "front end", "full stack", "fullstack", "full-stack", "react", "next.js", "ui"];
      const neg = ["junior", "intern", "ios", "android", "embedded", "firmware", "data engineer", "devops"];
      
      const hasPos = pos.some(p => t.includes(p));
      const hasNeg = neg.some(n => t.includes(n));
      
      if (hasPos && !hasNeg) {
         results.push(l);
      }
    });
    await new Promise(r => setTimeout(r, 2000));
  }
  
  await browser.close();
  
  // Dedup and format
  const pipeline = fs.readFileSync('data/pipeline.md', 'utf8');
  let newAdded = 0;
  let toAppend = "\n## From WebSearch\n";
  
  const uniqueUrls = new Set();
  
  for (const r of results) {
     let url = r.url;
     // Cleanup DDG redirect URL
     if (url.includes('duckduckgo.com/l/?uddg=')) {
         url = decodeURIComponent(url.split('uddg=')[1].split('&')[0]);
     }
     
     if (!pipeline.includes(url) && !uniqueUrls.has(url)) {
         let company = "Unknown";
         if (r.title.includes(' at ')) company = r.title.split(' at ')[1].split('|')[0].trim();
         else if (r.title.includes(' @ ')) company = r.title.split(' @ ')[1].split('|')[0].trim();
         else if (url.includes('ashbyhq.com/')) company = url.split('ashbyhq.com/')[1].split('/')[0];
         else if (url.includes('greenhouse.io/')) company = url.split('greenhouse.io/')[1].split('/')[0];
         
         toAppend += `- [ ] ${url} | ${company} | ${r.title.split(' at ')[0].split(' @ ')[0].trim()}\n`;
         newAdded++;
         uniqueUrls.add(url);
     }
  }
  
  if (newAdded > 0) {
      fs.appendFileSync('data/pipeline.md', toAppend);
      console.log(`\nAdded ${newAdded} new jobs to data/pipeline.md from WebSearch!`);
  } else {
      console.log(`\nNo new jobs found from WebSearch.`);
  }
}

run();
