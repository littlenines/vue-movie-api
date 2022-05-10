export const getMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=d38aa8716411ef7d8e9054b34a6678ac');
    console.log(response);
}