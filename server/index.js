const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.get("/", async (req, res) =>{
    try {

    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

        await page.goto("https://manga4life.com/search/?sort=vm&desc=true", {waitUntil: 'networkidle2'});
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));

        const hotManga = await page.evaluate(() => {
            const titlesContainer = document.querySelectorAll(".SeriesName.ng-binding");
            const thumbnailContainer = document.querySelectorAll("a.SeriesName img");
            const manga = [];
            titlesContainer.forEach((title, index) => {
                const titleText = title.innerText;
                manga.push({
                    title: titleText,
                    thumbnail: thumbnailContainer[index].src
                });
            });
            return manga;
        })

        await browser.close();
        res.json(hotManga);
    }
    catch(error) {
        console.error("Error occurred while scraping:", error);

        res.status(500).send(`Error: ${error}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})