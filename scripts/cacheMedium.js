import fs from "fs";
import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";

const FEED = "https://medium.com/feed/@axelivandatanjung";

const xml = await fetch(FEED).then(r => r.text());
const data = new XMLParser({ ignoreAttributes:false }).parse(xml);
const items = data.rss.channel.item.slice(0,10);

const posts = items.map(p => ({
  title: p.title,
  link: p.link,
  date: new Date(p.pubDate).toISOString().split("T")[0],
  desc: p.description.replace(/<[^>]+>/g,"").slice(0,180) + "…",
  pinned: false
}));

posts[0].pinned = true;     // highlight newest

fs.writeFileSync("src/data/medium.json", JSON.stringify(posts,null,2));
console.log("✔ Medium journal updated");
