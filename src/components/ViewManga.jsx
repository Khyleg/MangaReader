import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewManga.css";
function ViewManga() {
    console.log("yikes");
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
                            <h5 className="chapter_title">{item}</h5>
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