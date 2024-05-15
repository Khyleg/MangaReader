import NavigationBar from "./components/NavigationBar.jsx";
import React, { useState, useEffect } from 'react';
import RandomMangaContainer from "./components/RandomMangaContainer.jsx";
import { fetchRandomManga } from "./components/MangaDexHelper.jsx";
import "./App.css";

function App() {
  
  const [randomManga, setRandomManga] = useState(null);
  const [leftMangaInformation, setLeftManga] = useState(null);
  const [rightMangaInformation, setRightManga] = useState(null);
  const [leftMangaIndex, setLeftMangaIndex] = useState(5);
  const [rightMangaIndex, setRightMangaIndex]  = useState(6);
      console.log("Current Left Value: ", leftMangaIndex);
      console.log("Current Right Value: ", rightMangaIndex);
  useEffect(() => {
    const fetchRandomMangaList = async () => {
      const mangaList = [];
      for (let i = 0; i < 12; i++) {
        const mangaInformation = await fetchRandomManga();
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
      console.log("Current Left Value: ", leftMangaIndex);
      console.log("Current Right Value: ", rightMangaIndex);

  };
  const changeRight = () => {
    console.log("zero: ", randomManga[0]);
    console.log("five: ", randomManga[5]);
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
        <button onClick={changeLeft} className="custom-button">{'<'}</button>
        <RandomMangaContainer mangaInformation={leftMangaInformation} />
        <RandomMangaContainer mangaInformation={rightMangaInformation} />
        <button onClick={changeRight} className="custom-button">{'>'}</button>

      </div>
    </>
  );
}

export default App;
