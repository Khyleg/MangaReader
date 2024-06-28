import NavigationBar from "./components/NavigationBar.jsx";
import React, { useState, useEffect } from 'react';
import RandomMangaContainer from "./components/Home/RandomMangaContainer.jsx";
import { fetchRandomManga } from "./functions/MangaDexHelper.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewManga from "./components/Manga/ViewManga.jsx";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import SearchManga from "./components/Manga/SearchManga.jsx";
import ViewChapter from "./components/Manga/ViewChapter.jsx";

function App() {
  return (
    <Router basename="/MangaReader">
      <NavigationBar />
      <Routes>
          <Route path="/MangaReader" element={<Home />} />
          <Route path="/manga/:mangaID/:mangaName/:mangaCover/:coverFileName" element={<ViewManga />} />
          <Route path="/search/:searchQuery/" element={<SearchManga />} />
          <Route path="/:mangaID/chapter/:chapterID/" element={<ViewChapter />} />


      </Routes>
    </Router>
  );
}

export default App;
