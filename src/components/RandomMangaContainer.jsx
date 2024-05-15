import { useEffect, useState } from "react";
import {fetchRandomManga} from "./MangaDexHelper";
import "./RandomMangaContainer.css";
export default function RandomMangaContainer(mangaInformationObject) {

    const mangaInformation = mangaInformationObject.mangaInformation;
    if(mangaInformation) {
        return (
            <div className="container">
                <div className="description-text">
                    <h2>{mangaInformation["en_title"]}</h2>
                    <br></br><br></br><br></br>
                    <h3>{mangaInformation["summary"]}</h3>
                </div>
                <img src={mangaInformation["cover_url"]} width={150} height={270} />

            </div>

        )
    }
}