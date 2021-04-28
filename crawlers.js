const puppeteer = require("puppeteer");

//*******************************POEM_SCRAPER************************************* */
// returns a poem object{poemName,poem,authorName,authorInfo}
const poemScraper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const poemObj = {};
  const poemName = await page.evaluate(
    () =>
      document.querySelector("body").children[3].children[2].children[0]
        .children[2].innerText
  );
  poemObj.poemName = poemName;
  const poem = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("#poem_content > h3"),
      (e) => e.innerText
    )
  );
  poemObj.poem = poem.join("");
  const poet = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".col-md-5.col-12.float-left > .s-menu1 ")[0]
        .children,
      (e) => e.innerText
    )
  );
  poet.map((field, i) => {
    if (i === 2) {
      poemObj.authorName = field;
    }
    if (i === 3) {
      poemObj.authorInfo = field;
    }
  });
  await browser.close();
  return poemObj;
};

//***********************************TOPICS************************************ */
//returns an array of arrays [href,topic]
const topicsScraper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const poemsTopics = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.row.px-3")[0].children, (e) => [
      e.children[0].attributes.href.value,
      e.innerText,
    ])
  );
  await browser.close();
  return poemsTopics;
};

//***********************************POEM_URL_SCRAPER************************************ */
//returns an array of songs url
const poemUrlScraper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const poemsList = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".container")[2].children[0].children[0]
        .children[0].children[1].children,
      (e) => e.children[0].attributes.href.value
    )
  );
  await browser.close();
  return poemsList;
};

module.exports = { poemScraper, topicsScraper, poemUrlScraper };
