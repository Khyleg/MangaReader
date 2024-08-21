import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import './ViewChapter.css'
function ViewChapter() {
    console.log("fk?");
    const location = useLocation();
    const location_data = location.state?.chapters;
    console.log(location_data);
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
        <div className="ViewChapter">
            <div className="chapter-selection">
                <select id="chapter-select">
                    {location_data.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item}
                        </option>
                    ))}
                </select>
                <div className="right-buttons">
                    <button>Prev</button>
                    <button>Next</button>
                </div>
            </div>
            <br></br>
            <div className="chapter-pages">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => (
                        <img src={item} />
                    ))
                ) : (
                    <p>Loading Chapter Images </p>
                )}
            </div>
        </div>
    )
}

export default ViewChapter;