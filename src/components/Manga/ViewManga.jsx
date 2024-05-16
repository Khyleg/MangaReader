import { useParams } from 'react-router-dom';

function ViewManga() {
    const { name,age } = useParams();
    console.log(name);
    console.log(age);
    return(
        <h1>Hello World</h1>
    )
};

export default ViewManga;