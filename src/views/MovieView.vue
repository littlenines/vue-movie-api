<template>
  <nav>
    <router-link to="/Movies">Movies</router-link>
  </nav>
  <div class="about">
    <!-- <Genre /> -->
    <div v-for="(genre, index) in idk" :key="index">
      <h4>{{genreNames[index]}}</h4>
      <div v-for="a in genre" :key="a.id">
        <p>{{a.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Genre from "@/components/MovieGenre.vue";
import genres from "../../genres.json";
import { getMoviesApi } from "@/utils/movieApi";
export default {
  components: {
    Genre,
  },
  data() {
    return {
      getMovieGenres: genres.genres,
      idk: [],
      genreNames:[]
    };
  },
  computed: {

  },
  methods: {
    async getGenres() {
      const aa = await Promise.all( // what now ????????????????????
        this.getMovieGenres.map(async (genres) => {
          const bb = await getMoviesApi(genres.id);
          return bb.results.slice(0, 5);
        })
      );
      this.idk = aa;
      this.genreNames = (genres.genres).map(data => data.name)
      console.log(this.idk);
    },
  },
  created() {
    this.getGenres();
    // this.getMovies();
  },
};
</script>