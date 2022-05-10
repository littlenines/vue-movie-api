<template>
  <section>
    <div
      class="genre"
      v-for="(movieData, propertyName) of moviesByGenres"
      :key="propertyName"
    >
      <h2>{{ propertyName }}</h2>
      <div class="images">
        <div class="img" v-for="movie in movieData" :key="movie.id">
          <img :src="movie.img" :alt="movie.title" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import getGenres from "../../genres.json";
import { getMoviesApi } from "@/utils/movieApi";
let genres = Object.values(getGenres).map((data) => data);
export default {
  data() {
    return {
      movies: [],
      moviesByGenres: {},
      titleGenre: [],
    };
  },
  methods: {
    async getMovies() {
      for (let i = 0; i < genres[0].length; i++) {
        const { id, name } = genres[0][i];
        this.titleGenre.push({ id, name });
        const json = await getMoviesApi(id);
        console.log(json);
        const objectKey = Object.fromEntries(
          this.titleGenre.map((data) => [data.name, []])
        );
        this.moviesByGenres = objectKey;

        for (let j = 0; j < 5; j++) {
          const { title, genre_ids, backdrop_path, id } = json.results[j];
          this.movies.push({
            title: title,
            id: genre_ids,
            movie_id: id,
            img: "https://image.tmdb.org/t/p/w1280" + backdrop_path,
            genre: name,
          });
        }

        for (const key in objectKey) {
          for (let j = 0; j < this.movies.length; j++) {
            if (this.movies[j].genre === key) {
              objectKey[key].push(this.movies[j]);
            }
          }
        }
      }
    },
  },
  created() {
    this.getMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
