const puppeteer = require("puppeteer");
const axios = require("axios");
const { poemScraper, topicsScraper, poemUrlScraper } = require("./crawlers");
const baseUrl = "https://www.aldiwan.net/";
const fs = require("fs");
const topicsUrl = "https://www.aldiwan.net/Poem-topics";
const poemsListUrl =
  "https://www.aldiwan.net/Poems-Topics-%D8%A7%D8%B9%D8%AA%D8%B0%D8%A7%D8%B1.html";
const poemUrl = "https://www.aldiwan.net/poem28868.html";
require("events").EventEmitter.defaultMaxListeners = 20;

const main = async () => {
  //get an array of topics urls

  // const topics = await topicsScraper(topicsUrl);
  // const topicsList = topics.map((topicURL) => {
  //   return [`${baseUrl}${topicURL[0]}`, topicURL[1]];
  // });

  //**************************************** */
  const dataBuffer = fs.readFileSync("./data/topics.json");
  const dataJSON = JSON.parse(dataBuffer.toString());
  console.log(dataJSON[17][0]);
  console.log(dataJSON[17][1]);

  const poemUrlScraperTest = await poemUrlScraper(dataJSON[17][0]);
  console.log(poemUrlScraperTest);

  const arr = [];
  for (const ur of poemUrlScraperTest) {
    let poem = await poemScraper(`${baseUrl}${ur}`);
    poem.category = dataJSON[17][1];
    arr.push(poem);
  }
  console.log(arr);
  fs.writeFileSync("./data/songs18.json", JSON.stringify(arr));
};
main();

// const dataBuffer = fs.readFileSync("./data/songs9.json");
// const dataJSON = JSON.parse(dataBuffer.toString());

// for (let poem of dataJSON) {
//   console.log(poem);
//   axios.post("http://3.122.232.246:5000/api/poems/new", poem).then(
//     (response) => {
//       console.log("o.k");
//     },
//     (error) => {
//       console.log("errrrrrr");
//     }
//   );
// }
