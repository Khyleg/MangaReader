import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewChapter() {
    console.log("fk?");
    const params = useParams();
    const [data, setChapter] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/scrapechapter?path=${params.chapterurl}`)
          .then(response => response.json())
          .then(data => {
             setChapter(data)
             console.log("Fetched Data: ", data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    return(
        <>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <img src={item} />
                ))
            ) : (
                <p>Loading Chapter Images </p>
            )}
        </>
    )
}

export default ViewChapter;