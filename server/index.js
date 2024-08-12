const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.get("/scrapehot", async (req, res) =>{
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

        await page.goto("https://manga4life.com/search/?sort=vm&desc=true", {waitUntil: 'networkidle2'});
        // await page.evaluate(() => window.scrollBy(0, window.innerHeight));

        const hotManga = await page.evaluate(() => {
            const titlesContainer = document.querySelectorAll(".SeriesName.ng-binding");
            const thumbnailContainer = document.querySelectorAll("a.SeriesName img");
            const mangaContainer = document.querySelectorAll("a.SeriesName.ng-binding");
            const manga = [];
            titlesContainer.forEach((title, index) => {
                const titleText = title.innerText;
                manga.push({
                    title: titleText,
                    thumbnail: thumbnailContainer[index].src,
                    mangaLink: mangaContainer[index].getAttribute("href")
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

app.get("/scrapelatest", async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    await page.goto("https://manga4life.com/", { waitUntil: 'networkidle2' });
    
    const latestChapters = await page.evaluate(() => {
        const chapsList = [];
        const latestContainer = document.querySelector(".BoxBody.LatestChapters");
        if (latestContainer) {
            const rowChapters = latestContainer.querySelectorAll(".row.Chapter");
            rowChapters.forEach((data, index) => {
                const img = data.querySelector("img");
                const title = data.querySelector(".SeriesName")
                const chapter = data.querySelector(".ChapterLabel.ng-binding")
                const time = data.querySelector(".DateLabel.ng-binding.ng-scope");
                chapsList.push({
                    img: img.src,
                    title: title.innerText,
                    chapter: chapter.innerText,
                    uploadTime: time.innerText
                });
            })
            // rowChapters.forEach((data) => {
            //     const mangaLink = data.querySelector("a");
            //     if (mangaLink) {
            //         // Capture relevant information
            //         chapsList.push(mangaLink.innerText);
            //     }
            // });
        } else {
            console.error("LatestChapters container not found");
        }
        
        return chapsList;
    });

    await browser.close();
    res.json(latestChapters);
});

app.get("/scrapemanga", async(req, res) => {
    const mangaUrl = "https://manga4life.com/" + req.query.path;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    await page.goto(mangaUrl, { waitUntil: 'networkidle2' });
    const manga = await page.evaluate(() => {
        const description = [];
        const descriptionClass = document.querySelectorAll(".top-5.Content");
        descriptionClass.forEach((item, index) => {
            description.push(item.innerText);
        });
        return description
    })
    res.json(manga);
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})