// import { load } from "cheerio"


// const url = "https://medium.com/tag/nodejs"



// try {
//     const response = await fetch(url);
//     const text = await response.text();
    
//     console.log(text);
//         console.log("Html length:", text.length);

//     const $ = load(text)
// const elements = $("h2");
//     console.log("element length:", elements.length);

// elements.each((i,elements)=>{
//     console.log($(elements).text());
    
// })

    
// }catch(err){
//     console.log("error",err.message);
    
// }


// import puppeteer from "puppeteer";


// const URL = "https://medium.com/tag/nodejs";

// const browser = await puppeteer.launch(); 
// const page = await browser.newPage(); 

// await page.setUserAgent( 
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 " +
//   "(KHTML, like Gecko) Chrome/118 Safari/537.36"
// );

// await page.goto(URL, { waitUntil: "networkidle2" });  

// (await page.waitForTimeout?.(3000)) ?? 
//   (await new Promise((r) => setTimeout(r, 3000)));

// const articles = await page.$$("article"); 

// for (const el of articles) { 
//   const title = await el
//     .$eval("h2", (el) => el.textContent.trim())
//     .catch(() => null);

//   const url = await el
//     .$eval("a", (el) => el.href)
//     .catch(() => null);

//   if (title && url) {
//     console.log(title, url);  
//   }
// }

// await browser.close();




import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = 3000;
const BASE_URL = "https://medium.com/tag/nodejs";
const PAGE_LIMIT = 2; // number of pages to scrape (Medium uses "load more" / infinite scroll)

// --- Scrape articles from Medium ---
async function scrapeArticles(keyword = "") {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/118 Safari/537.36"
  );

  await page.goto(BASE_URL, { waitUntil: "networkidle2" });
await new Promise((resolve) => setTimeout(resolve, 3000));

  let results = [];
  const seenUrls = new Set();

  for (let i = 0; i < PAGE_LIMIT; i++) {
    const articles = await page.$$("article");

    for (const el of articles) {
      const title = await el
        .$eval("h2", (el) => el.textContent.trim())
        .catch(() => null);
      const url = await el
        .$eval("a", (el) => el.href)
        .catch(() => null);

      if (title && url && !seenUrls.has(url)) {
        // Keyword filtering
        if (!keyword || title.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({ title, url });
        }
        seenUrls.add(url);
      }
    }

    // Scroll to load more articles
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  await browser.close();
  return results;
}

// --- API Route ---
app.get("/api/articles", async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const articles = await scrapeArticles(keyword);

    res.json({
      count: articles.length,
      articles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scrape articles" });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/articles`);
});
