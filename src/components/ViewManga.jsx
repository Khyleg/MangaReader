import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewManga() {
    console.log("yikes");
    const params = useParams();
    console.log(params.mangaurl);
    const [manga, setManga] = useState([]);
    console.log(`Fetching: http://localhost:3000/scrapemanga?path=manga/Boku-No-Hero-Academia`);
    useEffect(() => {
        fetch(`http://localhost:3000/scrapemanga?path=manga/Boku-No-Hero-Academia`)
          .then(response => response.json())
          .then(data => setManga(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    return(
        <p>{manga}</p>
    );
}
export default ViewManga;