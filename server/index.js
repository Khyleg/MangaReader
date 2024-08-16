const {newPagePuppeteer, closePuppeteer} = require('./InitializePuppeteer');

const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.get("/scrapehot", async (req, res) =>{
    let page;
    try {
        page = await newPagePuppeteer();

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
    finally {
        if (page) await page.close();  // Ensure page is closed
    }
});

app.get("/scrapelatest", async (req, res) => {
    let page;
    try {
        page = await newPagePuppeteer();
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
    }
    catch(error) {
        console.error("Error occurred while scraping:", error);

        res.status(500).send(`Error: ${error}`);
    }
    finally {
        if (page) await page.close();  // Ensure page is closed
    }
});

app.get("/scrapemanga", async(req, res) => {
    let page;
    try {
        const mangaUrl = "https://manga4life.com/" + req.query.path;
        page = await newPagePuppeteer();
        await page.goto(mangaUrl, { waitUntil: 'networkidle2' });
        while (await page.$('.list-group-item.ShowAllChapters.ng-scope')) {
            await page.click('.list-group-item.ShowAllChapters.ng-scope');
            // await page.waitForTimeout(1000); // Adjust the timeout as needed
        }
        const manga = await page.evaluate(() => {
            const manga = {thumbnail: "", description: ""};
            const descriptionClass = document.querySelectorAll(".top-5.Content");
            const title = document.querySelector(".list-group-item.d-none.d-sm-block");
            const mangaInfo = document.querySelectorAll(".list-group-item.d-none.d-md-block");
            const chapters = document.querySelectorAll('.list-group-item.ChapterLink.ng-scope');
            const thumbnail = document.querySelector(".img-fluid.bottom-5");
            const manga_chapters = [];
            const manga_chapters_date = [];
            const descriptionContainer = [];
            manga.thumbnail += thumbnail.getAttribute("src")
            manga.title = title.querySelector("h1").innerText;
            mangaInfo.forEach((item, index) => {
                descriptionContainer.push(item.innerText);
            });
            manga.description = descriptionContainer;

            chapters.forEach((item, index) => {
                manga_chapters.push(item.querySelector(".ng-binding").innerText);
                manga_chapters_date.push(item.querySelector(".float-right.d-none.d-md-inline.ng-binding").innerText);
            });
            manga.chapters = manga_chapters;
            manga.chapters_date = manga_chapters_date;
            return manga
        })

        res.json(manga);
    }
    catch(error) {
        console.error("Error occurred while scraping:", error);

        res.status(500).send(`Error: ${error}`);
    }
    finally {
        if (page) await page.close();  // Ensure page is closed
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})