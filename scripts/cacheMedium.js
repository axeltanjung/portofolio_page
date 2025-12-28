import fs from "fs";
import Parser from "rss-parser";

const parser = new Parser();
const feed = await parser.parseURL("https://medium.com/feed/@axelivandatanjung");

const posts = feed.items.slice(0,6).map(p=>({
  title:p.title,
  desc:p.contentSnippet,
  link:p.link,
  date:new Date(p.pubDate).toLocaleDateString()
}));

fs.writeFileSync("src/data/medium.json", JSON.stringify(posts,null,2));
console.log("Medium cached:", posts.length);
