import NavigationBar from "./components/NavigationBar.jsx";
import React, { useState, useEffect } from 'react';
import RandomMangaContainer from "./components/Home/RandomMangaContainer.jsx";
import { fetchRandomManga } from "./functions/MangaDexHelper.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewManga from "./components/Manga/ViewManga.jsx";
import "./App.css";
import Home from "./components/Home/Home.jsx";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga/:name/:age" element={<ViewManga />} />
      </Routes>
    </Router>
  );
}

export default App;
