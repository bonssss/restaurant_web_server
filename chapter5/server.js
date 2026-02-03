import Parser from "rss-parser";

const parser = new Parser();

  const urls = ["https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.budgetbytes.com/category/recipes/feed/",
  "https://www.reddit.com/r/recipes/.rss"
    
  ];

const main = async () => {


  const feedItems=[];
  const awaitableRequests  = urls.map(url=>parser.parseURL(url));
  const responses = await Promise.all(awaitableRequests);
   aggregate(responses, feedItems);
  print(feedItems);
  // const response = await fetch(url);
  // const data = await response.text();
  // const parsed = await parser.parseString(data);
  // console.log(parsed);
//   const { title, items } = await parser.parseURL(url);
//   console.log(`Feed Title: ${title}`);
//   const results = items.map(({ title, link }) => ({ title, link }));
// //   console.log(results);
// console.clear();
// console.log('Last updated ', (new Date()).toUTCString() );
//   console.table(results);
};

const aggregate = (responses, feedItems) => { 
  for (let {items} of responses) { 
    for (let {title, link} of items) { 
    //   if (title.toLowerCase().includes('veg')) { 
        feedItems.push({title, link});
      
    }
  }
  return feedItems; 
}

const print = feedItems => {
  console.clear(); 
  console.table(feedItems); 
  console.log('Last updated ', (new Date()).toUTCString()); 
}

// setInterval(main, 2000);

main();
