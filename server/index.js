const {newPagePuppeteer, closePuppeteer} = require('./InitializePuppeteer');

const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.get("/scrapehot", async (req, res) =>{
    try {
        const page = await newPagePuppeteer();

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

        res.json(hotManga);
    }
    catch(error) {
        console.error("Error occurred while scraping:", error);

        res.status(500).send(`Error: ${error}`);
    }
});

app.get("/scrapelatest", async (req, res) => {
    const page = await newPagePuppeteer();
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

    res.json(latestChapters);
});

app.get("/scrapemanga", async(req, res) => {
    const mangaUrl = "https://manga4life.com/" + req.query.path;
    const page = await newPagePuppeteer();
    await page.goto(mangaUrl, { waitUntil: 'networkidle2' });
    while (await page.$('.list-group-item.ShowAllChapters.ng-scope')) {
        await page.click('.list-group-item.ShowAllChapters.ng-scope');
        // await page.waitForTimeout(1000); // Adjust the timeout as needed
      }
    const manga = await page.evaluate(() => {
        const description = [];
        const descriptionClass = document.querySelectorAll(".top-5.Content");
        const chapters = document.querySelectorAll('.list-group-item.ChapterLink.ng-scope');
        chapters.forEach((item, index) => {
            description.push(item.innerText);
        });
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