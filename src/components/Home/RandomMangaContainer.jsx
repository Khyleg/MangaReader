import { useEffect, useState } from "react";
import {fetchRandomManga} from "D:/Nerdy Stuff/MangaSite/MangaWebsite/src/functions/MangaDexHelper";
import "./RandomMangaContainer.css";
export default function RandomMangaContainer(mangaInformationObject) {

    const browseTitle = (manga) =>
        {
            console.log("Clicked: ", manga["en_title"]);
            console.log("ID: ", manga["manga_id"]);
        }
    const mangaInformation = mangaInformationObject.mangaInformation;
    if(mangaInformation) {
        return (
            <div className="container">
                <div className="description-text">
                    <button className="manga_title" onClick={() => browseTitle(mangaInformation)}>{mangaInformation["en_title"]}</button>
                    <br></br><br></br><br></br>
                    <h3>{mangaInformation["summary"]}</h3>
                </div>
                <img src={mangaInformation["cover_url"]} width={150} height={270} />

            </div>

        )
    }
}