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
            <h1>Recently updated</h1>
            <div className="Latest-Manga-Container">
                {manga.map((item, index) =>(
                    <div className="manga">
                        <img src={item.img}></img>
                        <div className="description">
                            <h3>{item.title}</h3>
                            <h5>{item.chapter}</h5>
                            <h5>{item.uploadTime}</h5>
                        </div>
                    </div>
                ))};
            </div>
        </div>
    )
}

export default LatestUpdates;