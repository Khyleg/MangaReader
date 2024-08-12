import { useEffect, useState } from "react";

function ViewManga() {
    console.log("yikes");
    const [manga, setManga] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/scrapehot')
          .then(response => response.json())
          .then(data => setManga(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    return(
        <p>Test</p>
    );
}
export default ViewManga;