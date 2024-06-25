import { useNavigate, useParams } from 'react-router-dom';
import './ViewManga.css';
import { fetchMangaChapters } from '../../functions/MangaDexHelper';
import { useEffect, useState } from 'react';
function ViewManga() {
    const { mangaID,mangaName, mangaCover, coverFileName } = useParams();
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const ViewChap = (chapterID) => {
        console.log("Selected chap ID", chapterID);
        navigate(`/chapter/${chapterID}`);

    }
    useEffect(() => {
        fetchMangaChapters(mangaID)
            .then(data => {
                setChapters(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;
    return(
        <>
            <div className="MangaView">
                <div className="manga-details">
                    <div className="cover">
                        <img src={`https://uploads.mangadex.org/covers/${mangaCover}/${coverFileName}`}></img>
                    </div>
                    <div className="title">
                        <h1>{mangaName}</h1>
                        <p>Genre: Lorem ipsum dolor sit amet, consectetur adipisicing elit. A maiores ea cupiditate sip</p>
                        <p>----------------------------------------------------------------------------------------------------------------------------------------------------</p>
                        <p>Alternate Name</p>
                        <p>----------------------------------------------------------------------------------------------------------------------------------------------------</p>
                        <p>Type</p>
                        <p>----------------------------------------------------------------------------------------------------------------------------------------------------</p>
                        <p>Released:</p>
                        <p>----------------------------------------------------------------------------------------------------------------------------------------------------</p>
                        <p>Status</p>
                        <p>----------------------------------------------------------------------------------------------------------------------------------------------------</p>
                        <p>Description</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos doloremque id, perspiciatis sequi soluta exercitationem ex iure quae dolore vel dolores eius placeat. Officia maiores ullam, iusto dolore est consequuntur!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quia, cumque veniam inventore neque repudiandae reprehenderit porro deleniti ipsum consequatur, consequuntur ullam at? Quos quasi distinctio necessitatibus, voluptatem quod veritatis?</p>
                    </div>
                </div>
                <div className="manga-chapters">
                        {chapters.map((chaps) => (
                            <h3 onClick={() => ViewChap(chaps.id)}>Chapter {chaps.attributes.chapter}</h3>
                        ))};
                </div>
            </div>
        </>
    )
};

export default ViewManga;