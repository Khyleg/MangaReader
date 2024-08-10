import { useState, useEffect } from "react";
import "./HotManga.css"
function HotManga() {
    const [manga, setManga] = useState([]);
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setrightIndex] = useState(5);
  
    useEffect(() => {
      fetch('http://localhost:3000/scrapeHot')
        .then(response => response.json())
        .then(data => setManga(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const handleLeft = () => {
      setLeftIndex(leftIndex-1);
      setrightIndex(rightIndex-1);
    }
    const handleRight = () => {
      setrightIndex(rightIndex+1);
      setLeftIndex(leftIndex+1);
  
    }
    const hotMangaList = manga.slice(leftIndex,rightIndex);
    return(
    <div className="Hot-Manga">
      <h1>Hot Manga</h1>
      <div className="hotMangaContainer">
        <button onClick={handleLeft} disabled={leftIndex === 0}>LEFT</button>
        {hotMangaList.map((item, index) => (
          <div className="hotManga">
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
        <button onClick={handleRight} disabled={rightIndex===manga.length}>RIGHT</button>
      </div>
    </div>
    );
}

export default HotManga;