import NavigationBar from "./components/NavigationBar.jsx"
import React, { useState, useEffect } from 'react';
import RandomMangaContainer from "./components/RandomMangaContainer.jsx";

function App() {
  
  return(

    <>
      <NavigationBar></NavigationBar>
      <RandomMangaContainer></RandomMangaContainer>

    </>
  )
}


export default App;