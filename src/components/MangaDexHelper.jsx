export const fetchRandomManga = () => {
    return fetch('https://api.mangadex.org/manga/random')
        .then(response => response.json())
        .then(data => {                
            const en_title = data.data.attributes.title.en;
            const cover_id = data.data.relationships[2].id;
            const summary = data.data.attributes.description.en;
            return fetchFileName(cover_id)
                .then(fileName => {
                    const MangaInformation = {
                        "en_title": en_title,
                        "cover_id": cover_id,
                        "summary" : summary,
                        "fileName": fileName
                    };
                    return MangaInformation;
                });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
  
export const fetchFileName = (cover_id) => {
    return fetch("https://api.mangadex.org/cover/" + cover_id)
        .then(response => response.json())
        .then(data => {
            return data.data.attributes.fileName;
        })
        .catch(error => {
            console.error("Error fetching file name:", error);
        });
}
