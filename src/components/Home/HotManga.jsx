import { useState, useEffect } from "react";
import "./HotManga.css"
import previousPageIcon from '../../assets/previous-page.png';
import nextPageIcon from '../../assets/next-page.png';

function HotManga() {
    const [manga, setManga] = useState([]);
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setrightIndex] = useState(8);
  
    useEffect(() => {
      fetch('http://localhost:3000/scrapehot')
        .then(response => response.json())
        .then(data => setManga(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const handleLeft = () => {
      if(leftIndex === 0){
        setLeftIndex(manga.length - 8)
        setrightIndex(manga.length);
      } else {
      setLeftIndex(leftIndex-1);
      setrightIndex(rightIndex-1);
      }
    }
    const handleRight = () => {
      if(rightIndex === manga.length) {
        setLeftIndex(0);
        setrightIndex(8);
      } else {

      setrightIndex(rightIndex+1);
      setLeftIndex(leftIndex+1);
      }
    }
    const hotMangaList = manga.slice(leftIndex,rightIndex);
    return(
    <div className="Hot-Manga">
      <h1>Hot Manga</h1>
      <div className="hotMangaContainer">
        <img className="previous-page" src={previousPageIcon} onClick={handleLeft} />
        {hotMangaList.map((item, index) => (
          <div className="hotManga">
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
        <img className="next-page" src={nextPageIcon} onClick={handleRight}/>
      </div>
    </div>
    );
}

export default HotManga;