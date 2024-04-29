import NavigationBar from "./components/NavigationBar.jsx"
import React, { useState, useEffect } from 'react';
import RandomMangaContainer from "./components/RandomMangaContainer.jsx";
import "./App.css";
function App() {
  
  return(

    <>
      <NavigationBar></NavigationBar>
      <div className="RandomMangaContainer">
        <RandomMangaContainer></RandomMangaContainer>
        <RandomMangaContainer></RandomMangaContainer>
      </div>

    </>
  )
}


export default App;