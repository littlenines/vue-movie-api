<template>
  <section>
    <div v-for="imdb in movieImdb" :key="imdb.title" class="imdb-info">
      <div class="imdb-image">
        <img :src="imgPath + imdb.poster_path" alt="" />
      </div>
      <div class="imdb-info-main">
        <h1 class="imdb-title">{{ imdb.title }}</h1>

        <p>
          Release date: <span>{{ imdb.release_date }}</span>
        </p>
        <p>
          MPAA: <span>{{ imdb.adult }}</span>
        </p>
        <p>
          Duration: <span>{{ imdb.runtime }} min</span>
        </p>
        <p>
          Overview: <span>{{ imdb.overview }}</span>
        </p>
        <p>
          Status: <span>{{ imdb.status }}</span>
        </p>
        <p>
          Imdb rating: <span>{{ imdb.vote_average }}</span>
        </p>
        <p class="imdb-genre">
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
        title,
        poster_path,
        release_date: release_date.split("-")[0],
        adult: this.adult,
        runtime,
        status,
        vote_average,
        overview,
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
.imdb-info {
  padding: 16px;
  @include xs {
    display: flex;
    padding: 32px;
  }
}

.imdb-title,
p {
  color: #42b983;
  font-weight: bold;

  span {
    color: #000;
    font-weight: normal;
  }
}

p {
  margin-bottom: 10px;
}

.imdb-image {
  max-width: 414px;
}

.imdb-info-main {
  padding: 0;
  @include xs {
    padding: 0 32px;
    flex: 1;
  }
}

.imdb-list-info {
  display: flex;
}

.imdb-genre {
  display: flex;
  flex-wrap: wrap;
}

.imdb-genre-list {
  border: 1px solid #000;
  padding: 5px;
  border-radius: 35px;
  margin-right: 5px;
  text-align: center;
  margin: 0 5px 5px;
  @include xs {
    margin: 0 5px 5px 0;
  }
}
</style>