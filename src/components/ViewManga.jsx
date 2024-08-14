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
        <>
            <div className="ViewManga-Row-1">
                {manga.thumbnail ? (
                    <img src={manga.thumbnail} alt="Manga Thumbnail" />
                ) : (
                    <p>Loading thumbnail</p>
                )
                }
                <div>
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
            {
                Array.isArray(manga.chapters) && manga.chapters.length > 1 ? (
                    
                    manga.chapters.map((item, index) => (
                        <p>{item}</p>
                    ))
                ) : (
                    <p>Loading Chapters</p>
                )
            }
        </>
    );
}
export default ViewManga;