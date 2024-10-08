import NavigationBar from "./components/NavigationBar.jsx";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from "./components/Home/Home.jsx";
import ViewManga from "./components/ViewManga.jsx";
import ViewChapter from "./components/ViewChapter.jsx";

function App() {
  console.log("did t reach me?");
  return (
    <Router basename="/">
      <NavigationBar />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/manga/:mangaurl" element={<ViewManga />} />
          <Route exact path="/chapter/:readonline/:chapterurl" element={<ViewChapter />} />


      </Routes>
    </Router>
  );
}

export default App;
