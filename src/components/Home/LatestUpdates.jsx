import { useEffect, useState } from "react";
import "./LatestUpdates.css"
function LatestUpdates() {
    const [manga, setLatest] = useState([]);
    useEffect( () => {
        fetch('http://localhost:3000/scrapelatest')
        .then(response => response.json())
        .then(data => setLatest(data))
        .catch(error => console.error('Error fetching data:', error));
    
    })
    return(
        <div className="Latest-Manga">
            <h2>Recently updated</h2>
            <div className="Latest-Manga-Container">
                {manga.map((item, index) =>(
                    <div className="manga">
                        <img src={item.img}></img>
                        <div className="description">
                            <h3 className="manga_title">{item.title}</h3>
                            <h5>{item.chapter}</h5>
                            <h5>{item.uploadTime}</h5>
                            
                            <button class="read_more">Read More</button>

                        </div>
                    </div>
                ))};
            </div>
        </div>
    )
}

export default LatestUpdates;