import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ViewManga.css";

function ViewManga() {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.mangaurl);
    const [manga, setManga] = useState([]);
    console.log(`Fetching: http://localhost:3000/scrapemanga?path=manga/${params.mangaurl}`);
    useEffect(() => {
        fetch(`http://localhost:3000/scrapemanga?path=manga/${params.mangaurl}`)
          .then(response => response.json())
          .then(data => {
             setManga(data)
             console.log("Fetched Data: ", data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    const ClickChapter = (chapter) => {
        console.log("Chapter Link: ", chapter);
        const chapters = manga.chapters;
        const lastPageIndex = chapter.lastIndexOf('-page');
        if(lastPageIndex !== -1) {
            const manga_chapter = chapter.slice(0, lastPageIndex) + '.html';
            navigate(`/chapter${manga_chapter}`, { state: {chapters: chapters}});
        }
    }
    
    return(
        <div className="ViewManga">
            <div className="manga">
                <div className="ViewManga-Row-1">
                    {manga.thumbnail ? (
                        <img src={manga.thumbnail} alt="Manga Thumbnail" />
                    ) : (
                        <p>Loading thumbnail</p>
                    )
                    }
                    <div className="manga_description">
                        <h2 className="manga_title">{manga.title}</h2>
                        {Array.isArray(manga.description) && manga.description.length > 0 ? (
                                manga.description.map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))
                            ) : (
                                <p>Loading description...</p>
                            )}
                            {/* {manga.description.map((item, index) => (
                                <p>{item}</p>
                            ))} */
                        }
                    </div>
                </div>
            <button className="read_now">Read Now</button>
            <div className="manga_chapters">
            {
                Array.isArray(manga.chapters) && manga.chapters.length > 0 ? (
                    manga.chapters.map((item, index) => (
                        <div className="manga_chapter">
                            <h5 onClick={() => ClickChapter(manga.chapters_link[index])} className="chapter_title">{item}</h5>
                            <p className="chapter_date">{manga.chapters_date[index]}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading Chapters</p>
                )
            }
            </div>
            </div>
        </div>
    );
}
export default ViewManga;