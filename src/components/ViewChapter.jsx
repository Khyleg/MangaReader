import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import './ViewChapter.css'
function ViewChapter() {
    const navigate = useNavigate();
    const location = useLocation();
    // const location_data = location.state?.chapters;
    // const chaptersLink = location.state?.chaptersLink;
    // console.log("Loc: ", location_data)
    const params = useParams();
    const [data, setChapter] = useState([]);
    // const [selectedValue, setSelectedValue] = useState('');

    const ClickChapter = (event) => {
        const selectedIndex = event.target.selectedIndex; // Subtract 1 to ignore the default option

        const value = event.target.value;
        setSelectedValue(value); 
        console.log("Chapter clicked:", chaptersLink[selectedIndex]);
        // navigate(`/chapter${chaptersLink[selectedIndex]}`, { state: {chapters: location_data, chaptersLink: chaptersLink}, replace: true });
        window.location.reload();
    }
    useEffect(() => {
        console.log(`Fetching: http://localhost:3000/scrapechapter?path=${params.chapterurl}`);
        fetch(`http://localhost:3000/scrapechapter?path=${params.chapterurl}`)
          .then(response => response.json())
          .then(data => {
             setChapter(data)
             console.log("Fetched Data: ", data.chapters);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    return(
        <div className="ViewChapter"> {/* Key prop to force re-render */}
            <div className="chapter-selection">
                {/* <select  id="chapter-select">
                    {location_data.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item}
                        </option>
                    ))}
                </select> */}
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