import React from 'react'

import "./Home.css";
import HotManga from './HotManga';
import LatestUpdates from './LatestUpdates';
function Home() {
  

  return (
    <>
      <HotManga></HotManga>
      <LatestUpdates></LatestUpdates>
    </>
  );
}

export default Home;