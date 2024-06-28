import React from 'react'

import { useParams } from "react-router-dom";
import { fetchChaptersImages, fetchMangaChapters } from "../../functions/MangaDexHelper";
import { useEffect, useState } from "react";
import "./ViewChapter.css"
export default function ViewChapter() {
    const { mangaID, chapterID } = useParams();
    const [chapterImagesName, setChapterImagesName] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [chapterHash, setChapterHash] = useState([]);

    useEffect(() => {
        fetchMangaChapters(mangaID)
            .then(data => {
                setChapters(data);
                console.log(data);
            })
        fetchChaptersImages(chapterID)
            .then((imagesUrl) => {
                console.log(imagesUrl[1])
                setChapterImagesName(imagesUrl[1])
                setChapterHash(imagesUrl[0])
            })

    }, [chapterID]);    

    // chapterImagesName.map((imageNames, index) => (
        
    // ));
    return(
        <div className="viewed_chapter">
        <button>Previous Chapter</button>
        
        <label htmlFor="cars">Chapters:</label>
            <select id="manga_chaps">
                {chapters.map((chaps, index) => (
                    <option value="">Chapter: {chaps.attributes.chapter}</option>
                ))}
            </select>
        <button>Next Chapter</button>
        {chapterImagesName.map((name, index) => (
            <div className="chapterImages">
                 <img src={`https://uploads.mangadex.org/data/${chapterHash}/${name}`}></img>

            </div>
        ))}

        </div>
    );
    
}