import React from 'react'

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RandomMangaContainer from "./RandomMangaContainer";
import { fetchRandomManga } from "../../functions/MangaDexHelper";
import SkeletonLoader from "./SkeletonLoader";
import "./Home.css";
function Home() {
    const [randomManga, setRandomManga] = useState([]);
    useEffect(() => {
      const fetchRandomMangaList = async () => {
        const mangaList = [];
        for(let i=0;i<2;i++) {
          const mangaInformation = await fetchRandomManga();
          mangaList.push(mangaInformation);
        }
        setRandomManga(mangaList);
        // setIsLoading(false);
      };
      fetchRandomMangaList();
    }, []);
    return(
      
      <div className="RandomMangaContainer">
        <RandomMangaContainer mangaInformation={randomManga[0]} />
        <RandomMangaContainer mangaInformation={randomManga[1]} />

      </div>
    );
  }

export default Home;