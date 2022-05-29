<template>
  <nav>
    <router-link to="/Movies">Movies</router-link>
  </nav>
  <div class="about">
    <!-- <Genre /> -->
    <div data-idk>
      
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
      console.log(aa);
      this.idk = aa;
    },
  },
  created() {
    this.getGenres();
    // this.getMovies();
  },
};
</script>