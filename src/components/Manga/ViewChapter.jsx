import { useParams } from "react-router-dom";
import { fetchChaptersImages } from "../../functions/MangaDexHelper";
import { useEffect, useState } from "react";

export default function ViewChapter() {
    const { chapterID } = useParams();
    const [chapterImagesName, setChapterImagesName] = useState([]);

    useEffect(() => {
        fetchChaptersImages(chapterID).then(setChapterImagesName);
    }, [chapterID]);    
    return(
        <>
        {chapterImagesName.map((imageNames, index) => (
            <h3 key={index}>{imageNames}</h3>  // Add a key prop and return the element
        ))}
        </>
    );
    
}