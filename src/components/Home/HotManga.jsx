import { useState, useEffect } from "react";
import "./HotManga.css";
import previousPageIcon from '../../assets/previous-page.png';
import nextPageIcon from '../../assets/next-page.png';
import { useNavigate } from "react-router-dom";

function HotManga() {
    const [manga, setManga] = useState([]);
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setRightIndex] = useState(7);
    const navigate = useNavigate(); // Hook usage at the top level of the component

    useEffect(() => {
        fetch('http://localhost:3000/scrapehot')
            .then(response => response.json())
            .then(data => setManga(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleLeft = () => {
        if (leftIndex === 0) {
            setLeftIndex(manga.length - 8);
            setRightIndex(manga.length);
        } else {
            setLeftIndex(leftIndex - 8);
            setRightIndex(rightIndex - 8);
        }
    }

    const handleRight = () => {
        if (rightIndex >= manga.length) {
            setLeftIndex(0);
            setRightIndex(8);
        } else {
            setRightIndex(rightIndex + 8);
            setLeftIndex(leftIndex + 8);
        }
    }

    const hotMangaList = manga.slice(leftIndex, rightIndex);

    // Function to handle button click and navigate
    const clickManga = (mangaLink) => {
        navigate(`${mangaLink}`); // Use navigate to route
    }

    return (
        <div className="Hot-Manga">
            <h2>Popular Today </h2>
            <div className="hotMangaContainer">
                {/* <img className="previous-page" src={previousPageIcon} onClick={handleLeft} alt="Previous Page" /> */}
                {hotMangaList.map((item, index) => (
                    <div className="hotManga" key={index}>
                        <img src={item.thumbnail} alt={item.title} />
                        <button onClick={() => clickManga(item.mangaLink)}>{item.title}</button>
                    </div>
                ))}
                {/* <img className="next-page" src={nextPageIcon} onClick={handleRight} alt="Next Page" /> */}
            </div>
        </div>
    );
}

export default HotManga;
