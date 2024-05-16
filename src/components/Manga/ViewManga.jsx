import { useParams } from 'react-router-dom';

function ViewManga() {
    const { mangaID,mangaName } = useParams();
    return(
        <h1>Hello {mangaID}{mangaName}</h1>
    )
};

export default ViewManga;