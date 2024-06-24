export const fetchRandomManga = () => {
    return fetch('https://api.mangadex.org/manga/random')
        .then(response => response.json())
        .then(data => {                
            const en_title = data.data.attributes.title.en;
            const cover_id = data.data.relationships[2].id;
            const summary = data.data.attributes.description.en;
            const manga_id = data.data.id;
            return fetchFileName(cover_id)
                .then(fileName => {
                    const cover_url = fetchCoverUrl(manga_id, fileName);
                    const MangaInformation = {
                        "en_title": en_title,
                        "cover_id": cover_id,
                        "summary" : summary,
                        "fileName": fileName,
                        "manga_id" : manga_id,
                        "cover_url" : cover_url
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

export const fetchCoverUrl = (manga_id, file_name) => {
    return "https://uploads.mangadex.org/covers/" + manga_id + "/" + file_name;
}

export const viewManga = () => {
    
}

export const fetchMangaChapters = (manga_id)  => {
    return fetch(`https://api.mangadex.org/manga/${manga_id}/feed?limit=500&order[createdAt]=asc&order[updatedAt]=asc&order[publishAt]=asc&order[readableAt]=asc&order[volume]=asc&order[chapter]=asc`)
        .then(response => response.json())
        .then(data => {
            return data.data;
        })
}