import NavigationBar from "./components/NavigationBar.jsx";
import React, { useState, useEffect } from 'react';
import RandomMangaContainer from "./components/RandomMangaContainer.jsx";
import { fetchRandomManga } from "./functions/MangaDexHelper.jsx";
import "./App.css";

function App() {
  
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
  

  return (
    <>
      <NavigationBar />
      
      <div className="RandomMangaContainer">
        <button onClick={changeLeft} className="random-manga-change-left">{'<'}</button>
        <RandomMangaContainer mangaInformation={leftMangaInformation} />
        <RandomMangaContainer mangaInformation={rightMangaInformation} />
        <button onClick={changeRight} className="random-manga-change-right">{'>'}</button>

      </div>
    </>
  );
}

export default App;
