import {fetchRandomManga} from "./MangaDexHelper";

const LoadRandomManga = () => {
    const [mangaInformation, setMangaInformation] = useState(null);
    for(let i = 0; i < 8; i ++) {
        fetchRandomManga()
        .then(information => {
            setMangaInformation
        })
    }
}

export default LoadRandomManga;