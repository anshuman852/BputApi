const axios = require("axios").default;
const express = require("express");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");
const dateFormat = require('dateformat');
const app = express();
app.use(cors());

/**
 * @api {get} /bput/news
 * @apiName GetNews
 * @apiGroup News
 * @apiSuccessExample {json} Success-Response:
 *      {
 *       "num": "1",
 *       "date": "18-04-2020",
 *       "title": "Notice for second extension of last date of bid submission for procurement of Scanning Electron Microscope for TEQIP-III, BPUT, Odisha",
 *       "link": "https://drive.google.com/open?id=1vnkK79GGLSjGxmRksIN3imchrXzNXB-b"
 *      }
 *
 */
app.get("/bput/news", async (req, res) => {
  try {
    axios.get("http://bput.ac.in/news.php").then(async resp => {
      $ = cheerio.load(resp.data);
      let announcetable = $(
        "#main_content > div.bodycontent > div > div:nth-child(2) > table > tbody"
      );
      cheerioTableparser($);
      data = $("table").parsetable(false, false, false);
      let message = [];
      for (i = 0; i < 10; i++) {
        num = data[0][i];
        date = cheerio
          .load(data[1][i])("span")
          .text();
        date=(date, dateFormat())
        titledata = data[2][i];
        title = cheerio
          .load(titledata)("a")
          .text();
        link = cheerio
          .load(titledata)("a")
          .attr("href");
        message.push({
          num: num,
          date: date,
          title: title,
          link: link
        });
      }
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(message, null, 4));
    });
  } catch {
    res.status(404);
    res.send("No idea");
  }
});
/**
 * @api {get} /bput/exam
 * @apiName GetExam
 * @apiGroup ExamNotice
 * @apiSuccessExample {json} Success-Response:
 *      {
 *       "num": "1",
 *       "date": "18-04-2020",
 *       "title": "Notice for second extension of last date of bid submission for procurement of Scanning Electron Microscope for TEQIP-III, BPUT, Odisha",
 *       "link": "https://drive.google.com/open?id=1vnkK79GGLSjGxmRksIN3imchrXzNXB-b"
 *      }
 *
 */
app.get("/bput/exam", async (req, res) => {
  try {
    axios.get("http://bput.ac.in/exam-info.php").then(async resp => {
      $ = cheerio.load(resp.data);
      let announcetable = $(
        "#main_content > div.bodycontent > div > div:nth-child(2) > table > tbody"
      );
      cheerioTableparser($);
      data = $("table").parsetable(false, false, false);
      let message = [];
      for (i = 0; i < 10; i++) {
        num = i + 1;
        date = cheerio
          .load(data[0][i])("span")
          .text();
        titledata = data[2][i];
        title = cheerio
          .load(titledata)("a")
          .text();
        link = cheerio
          .load(titledata)("a")
          .attr("href");
        message.push({
          num: num,
          date: date,
          title: title,
          link: link
        });
      }
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(message, null, 4));
    });
  } catch {
    res.send("No idea");
  }
});
app.listen(3000, () => console.log(`listening on port 3000!`));
