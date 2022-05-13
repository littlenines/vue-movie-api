<template>
  <section>
    <div v-for="imdb in movieImdb" :key="imdb.title" class="imdb-info">
      <div class="imdb-image">
        <img :src="imgPath + imdb.poster_path" :alt="imdb.title" />
      </div>
      <div class="imdb-info-main">
        <h1 class="imdb-title">{{ imdb.title }}</h1>

        <p class="imdb-info-text">
          Release date: <span>{{ imdb.release_date }}</span>
        </p>
        <p class="imdb-info-text">
          MPAA: <span>{{ imdb.adult }}</span>
        </p>
        <p class="imdb-info-text">
          Duration: <span>{{ imdb.runtime }} min</span>
        </p>
        <p class="imdb-info-text">
          Overview: <span>{{ imdb.overview }}</span>
        </p>
        <p class="imdb-info-text">
          Status: <span>{{ imdb.status }}</span>
        </p>
        <p class="imdb-info-text">
          Imdb rating: <span>{{ imdb.vote_average }}</span>
        </p>
        <p class="imdb-info-text imdb-genre">
          Genre:
          <span
            v-for="imdbGenre in genre"
            :key="imdbGenre.genre"
            class="imdb-genre-list"
            >{{ imdbGenre.genre }}</span
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { getImdbMovie } from "@/utils/movieApi";
export default {
  name: "MovieImdb",
  props: {
    id: String,
  },
  data() {
    return {
      movieImdb: [],
      adult: "",
      imgPath: "https://image.tmdb.org/t/p/w1280",
      genre: [],
    };
  },

  methods: {
    async displayMovie() {
      const json = await getImdbMovie(this.id);
      const {
        title,
        poster_path,
        release_date,
        adult,
        runtime,
        status,
        vote_average,
        overview,
        genres,
      } = json;

      adult ? (this.adult = "R") : (this.adult = "PG-13");
    
      for (let i = 0; i < genres.length; i++) {
        this.genre.push({ genre: genres[i].name });
      }

      this.movieImdb.push({
        title:title,
        poster_path: poster_path,
        release_date: release_date.split("-")[0],
        adult: this.adult,
        runtime:runtime,
        status: status,
        vote_average: vote_average,
        overview:overview,
        genres: this.genre,
      });
    },
  },
  created() {
    this.displayMovie();
  },
};
</script>

<style lang="scss">
</style>