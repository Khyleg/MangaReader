import { useEffect, useState } from "react";
import {fetchRandomManga} from "./MangaDexHelper";
import "./RandomMangaContainer.css";
export default function RandomMangaContainer() {
    const [mangaInformation, GetInformation] = useState();
    useEffect(() => {
        fetchRandomManga().then(mangaInformation => {
            GetInformation(mangaInformation);
        });
    },[]);
    if(mangaInformation) {
        return (
            <div className="container">
                <h3>{mangaInformation["en_title"]}</h3>
                <h3>{mangaInformation["summary"]}</h3>

            </div>
        )
    }
}