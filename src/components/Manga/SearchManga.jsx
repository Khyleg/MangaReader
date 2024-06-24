import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./SearchManga.css";

function SearchManga() {
    const navigate = useNavigate();
    const { searchQuery } = useParams();
    const [manga, setManga] = useState(null);
    const [covers, setCover] = useState(null);
    const [filenames, setFileName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ViewManga = (mangaID, mangaTitle, mangaCover) => {
        navigate(`/manga/${mangaID}/${mangaTitle}/${mangaCover}`);
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
                const coverFileName = [];

                await Promise.all(data.data.map(async(manga) => {
                    const mangaID = manga.id;
                    const coverID = manga.relationships[2].id;
                    try {
                        const response_1 = await fetch(`https://api.mangadex.org/cover/${coverID}`);
                        const filename_data = await response_1.json();
                        const fileName = filename_data.data.attributes.fileName;
                        const coverUrl = fileName;
                        mangaCovers.push(`${manga.id}/${fileName}`);
                        coverFileName.push(fileName);
                    }catch (coverError) {
                        console.error(`Failed to fetch cover for manga ID ${mangaID}:`, coverError);
                        mangaCovers.push("None"); // Push null or a placeholder if fetch fails
                    }
                })
            );
                setManga(data.data);
                setCover(mangaCovers);
                setFileName(coverFileName);
            } catch (error) {
                setError(error);
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
                            <img src={`https://uploads.mangadex.org/covers/${covers[index]}`}></img>
                            <button className='titleButton' onClick={() => ViewManga(manga.id, manga.attributes.title.en, covers[index])}>{manga.attributes.title.en}</button>
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
