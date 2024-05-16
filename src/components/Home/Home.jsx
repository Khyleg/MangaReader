import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RandomMangaContainer from "./RandomMangaContainer";
import { fetchRandomManga } from "../../functions/MangaDexHelper";
function Home() {
    const navigate = useNavigate();
  
    const [randomManga, setRandomManga] = useState(null);
    const [leftMangaInformation, setLeftManga] = useState(null);
    const [rightMangaInformation, setRightManga] = useState(null);
    const [leftMangaIndex, setLeftMangaIndex] = useState(5);
    const [rightMangaIndex, setRightMangaIndex]  = useState(6);
    useEffect(() => {
      const fetchRandomMangaList = async () => {
        const mangaList = [];
        for (let i = 0; i < 12; i++) {
          
          const mangaInformation = await fetchRandomManga();
          if(i === 0) {
           setLeftManga(mangaInformation);
          }
          mangaList.push(mangaInformation);
        }
        setRandomManga(mangaList);
        setLeftManga(mangaList[leftMangaIndex]);
        setRightManga(mangaList[rightMangaIndex]);
  
      };
  
      fetchRandomMangaList();
    }, []);
    const changeLeft = () => {
      navigate("/manga/fuck");
      if(rightMangaIndex === 6)
        {
          setRightManga(randomManga[11]);
          setRightMangaIndex(11);
        }
      else {
  
          setRightManga(randomManga[rightMangaIndex-1]);
        setRightMangaIndex(rightMangaIndex - 1);
  
      }
      if(leftMangaIndex === 0) 
        {
          setLeftManga(randomManga[leftMangaIndex]);
          setLeftMangaIndex(5);
        }
        else {
          setLeftManga(randomManga[leftMangaIndex-1]);
  
          setLeftMangaIndex(leftMangaIndex - 1);
  
        }
  
    };
    const changeRight = () => {
      if(leftMangaIndex === 5) {
        setLeftManga(randomManga[0]);
        setLeftMangaIndex(0);
  
  
      }
      else {
        setLeftManga(randomManga[leftMangaIndex+1]);
  
        setLeftMangaIndex(leftMangaIndex + 1);
  
  
      }
      if(rightMangaIndex === 11) {
        setRightManga(randomManga[rightMangaIndex]);
        setRightMangaIndex(6);
      }
      else {
        setRightManga(randomManga[rightMangaIndex+1]);
  
        setRightMangaIndex(rightMangaIndex + 1);
  
  
      }
        console.log("Current Left Value: ", leftMangaIndex);
        console.log("Current Right Value: ", rightMangaIndex);  
      };
    return(
      
      <div className="RandomMangaContainer">
        <button onClick={changeLeft} className="random-manga-change-left">{'<'}</button>
        <RandomMangaContainer mangaInformation={leftMangaInformation} />
        <RandomMangaContainer mangaInformation={rightMangaInformation} />
        <button onClick={changeRight} className="random-manga-change-right">{'>'}</button>
      </div>
    );
  }

export default Home;