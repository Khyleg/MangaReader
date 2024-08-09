import React from 'react'

import { useState, useEffect } from "react";
import "./Home.css";
function Home() {
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => setManga(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Hot Manga</h1>
      <ul>
        {manga.map((item, index) => (
          <li key={index}>
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;