import { useEffect, useState } from "react";
import {fetchRandomManga} from "./MangaDexHelper";
export default function RandomMangaContainer() {
    const [mangaInformation, GetInformation] = useState();
    useEffect(() => {
        fetchRandomManga().then(mangaInformation => {
            GetInformation(mangaInformation);
        });
    },[]);
    console.log(mangaInformation);
}