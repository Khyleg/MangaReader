import { useParams } from 'react-router-dom';

function ViewManga() {
    const { name } = useParams();
    console.log(name);
    return(
        <h1>Hello World</h1>
    )
};

export default ViewManga;