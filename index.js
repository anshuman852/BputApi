const axios = require('axios').default;
const express = require('express')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');
const app = express()
app.get('/news', async (req, res) => {
    axios.get("http://bput.ac.in/news.php").then(async (resp) => {
        $ = cheerio.load(resp.data);
        let announcetable = $('#main_content > div.bodycontent > div > div:nth-child(2) > table > tbody')
        cheerioTableparser($);
        data = $("table").parsetable(false, false, false);
        let message = []
        for (i = 0; i < 5; i++) {
            num = data[0][i]
            date = cheerio.load((data[1][i]))('span').text();
            titledata = data[2][i]
            title = cheerio.load(titledata)('a').text();
            link = cheerio.load(titledata)('a').attr('href')
            message.push({
                num: num,
                date: date,
                title: title,
                link: link
            })
        }
        res.send(message)
    })
})
app.listen(3000, () => console.log(`listening on port 3000!`))