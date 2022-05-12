<template>
  <section>
    <div
      class="genre"
      v-for="(movieData, propertyName) of moviesByGenres"
      :key="propertyName"
    >
      <h2>{{ propertyName }}</h2>
      <div class="images">
        <div
          class="img"
          v-for="movie in movieData"
          :key="movie.id"
          @click="setModalInfo(movie)"
        >
          <img :src="movie.img" :alt="movie.title" @click="showModal = true" />
        </div>
      </div>
    </div>
  </section>
  <Modal :show="showModal" :info="modalInfo" @close="closeModal" />
</template>

<script>
import getGenres from "../../genres.json";
import { getMoviesApi } from "@/utils/movieApi";
import Modal from "@/components/Modal.vue";

const GENRES = Object.values(getGenres).map((data) => data);
export default {
  components: {
    Modal,
  },
  data() {
    return {
      movies: [],
      moviesByGenres: {},
      titleGenre: [],
      showModal: false,
      modalInfo: [],
    };
  },
  methods: {
    async getMovies() {
      for (let i = 0; i < GENRES[0].length; i++) {
        const { id, name } = GENRES[0][i];
        this.titleGenre.push({ id, name });
        const JSON_DATA = await getMoviesApi(id);
        const objectKey = Object.fromEntries(
          this.titleGenre.map((data) => [data.name, []])
        );
        this.moviesByGenres = objectKey;

        for (let j = 0; j < 5; j++) {
          const {
            title,
            genre_ids,
            backdrop_path,
            id,
            overview,
            vote_average,
            release_date,
          } = JSON_DATA.results[j];
          
          this.movies.push({
            title: title,
            id: genre_ids,
            movie_id: id,
            img: "https://image.tmdb.org/t/p/w1280" + backdrop_path,
            genre: name,
            overview: overview,
            vote_average: vote_average,
            release_date: release_date,
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
    setModalInfo(movie) {
      this.modalInfo.push(movie);
    },

    closeModal() {
      this.showModal = false;
      this.modalInfo = [];
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
