const API_KEY = 'd38aa8716411ef7d8e9054b34a6678ac';

export const getMoviesApi = async (genreId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`
        );
        const data = await response.json();
        return Promise.resolve(data);

    } catch (error) {
        console.error(error);
    }
}
