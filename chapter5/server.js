import Parser from "rss-parser";

const parser = new Parser();

const main = async () => {
  const url = "https://www.bonappetit.com/feed/recipes-rss-feed/rss";
  // const response = await fetch(url);
  // const data = await response.text();
  // const parsed = await parser.parseString(data);
  // console.log(parsed);
  const { title, items } = await parser.parseURL(url);
  console.log(`Feed Title: ${title}`);
  const results = items.map(({ title, link }) => ({ title, link }));
  console.log(results);
};

main();
