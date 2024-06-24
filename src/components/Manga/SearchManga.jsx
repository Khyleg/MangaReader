import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./SearchManga.css";

function SearchManga() {
    const navigate = useNavigate();
    const { searchQuery } = useParams();
    const [manga, setManga] = useState(null);
    const [covers, setCover] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ViewManga = (mangaID, mangaTitle) => {
        navigate(`/manga/${mangaID}/${mangaTitle}`);
    }
    useEffect(() => {
        const fetchManga = async () => {
            const title = searchQuery; // Use the dynamic search query
            try {
                const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(title)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const mangaCovers = [];
                await Promise.all(data.data.map(async(manga) => {
                    const mangaID = manga.id;
                    const coverID = manga.relationships[2].id;
                    console.log(`Fetching: https://api.mangadex.org/cover/${coverID}`);
                    try {
                        const response_1 = await fetch(`https://api.mangadex.org/cover/${coverID}`);
                        const filename_data = await response_1.json();
                        const fileName = filename_data.data.attributes.fileName;
                        const coverUrl = `https://uploads.mangadex.org/covers/${mangaID}/${fileName}`;
                        mangaCovers.push(coverUrl);
                    }catch (coverError) {
                        console.error(`Failed to fetch cover for manga ID ${mangaID}:`, coverError);
                        mangaCovers.push(null); // Push null or a placeholder if fetch fails
                    }
                    return null; // As map requires a return statement, return null
                })
            );
                    // console.log(data.data);
                // console.log("Manga ID: ", mangaID);
                // console.log(coverID);
                setManga(data.data);
                setCover(mangaCovers);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchManga();
    }, [searchQuery]); // Dependency array ensures useEffect runs when searchQuery changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <>
            <h1>Search Results for: {searchQuery}</h1>
            <div className="result">
                {manga ? (
                    manga.map((manga, index) => (
                        <div className="manga" key={manga.id}>
                            <img src={covers[index]}></img>
                            <button className='titleButton' onClick={() => ViewManga(manga.id, manga.attributes.title.en)}>{manga.attributes.title.en}</button>
                        </div>
                        
                        
                        ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </>
    );
}

export default SearchManga;
