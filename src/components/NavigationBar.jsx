import React from 'react'

import { useRef } from "react";
import "./NavigationBar.css"
import { useNavigate } from "react-router-dom";

const NavigationButton = ({name}) => {
    return(
        <>
            <button className="navigation_buttons">{name}</button>
        </> 
    )
}


export default function NavigationBar() {
    const navigate = useNavigate();
    const searchRef = useRef("None");
    const SearchManga = () =>
        {
            const searchedQuery = searchRef.current.value;
            navigate(`/search/${searchedQuery}`);
        }
    return(
        <div className="navigation_bar">
            <img className="logo"   src="../src/assets/logo.png" alt="Logo" width="50px" height ="50px" />
            <h2 className="logo-text">
                <span style={{ color: 'orange' }}>M</span>anga
                <span style={{ color: 'orange' }}>R</span>eader
            </h2>
            <NavigationButton name="Home"></NavigationButton>
            <NavigationButton name="Popular"></NavigationButton>
            <NavigationButton name="Latest"></NavigationButton>
            <NavigationButton name="Random"></NavigationButton>
            <NavigationButton name="Genre"></NavigationButton>
            <input ref={searchRef} className="manga_search" placeholder="Search manga..."></input>
            {/* <button className="search_button" onClick={SearchManga}>Search</button> */}



        </div>
    )
}