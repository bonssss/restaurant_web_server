import Parser from "rss-parser";
import promptSync from "prompt-sync";

const prompt = promptSync();
const parser = new Parser();

// ✅ Ask user for keyword before running app
const KEYWORD = prompt("Enter a keyword to filter recipes (e.g., vegan, chili, salad): ").toLowerCase();

const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.budgetbytes.com/category/recipes/feed/",
  "https://www.reddit.com/r/recipes/.rss"
];

const main = async () => {
  const feedItems = [];
  const awaitableRequests = urls.map(url => parser.parseURL(url));
  const responses = await Promise.all(awaitableRequests);

  aggregate(responses, feedItems);
  print(feedItems);
};

const aggregate = (responses, feedItems) => {
  for (let res of responses) {
    const items = res.items || [];
    for (let item of items) {
      const title = item.title || "";
      const link = item.link || "";
      const pubDate = item.pubDate || null;

      // ✅ keyword filter (case-insensitive)
      if (title.toLowerCase().includes(KEYWORD)) {
        feedItems.push({ title, link, pubDate });
      }
    }
  }
};

const getAge = (pubDate) => {
  if (!pubDate) return "Unknown";

  const now = new Date();
  const published = new Date(pubDate);
  const diffMs = now - published;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} hr ago`;
};

const print = (feedItems) => {
  console.clear();

  const tableData = feedItems.map(item => ({
    Title: item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title,
    Link: item.link,
    Age: getAge(item.pubDate)
  }));

  console.table(tableData);
  console.log("Keyword:", KEYWORD);
  console.log("Last updated:", new Date().toUTCString());
};

main();
