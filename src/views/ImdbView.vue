<template>
  <MovieImdb :id="getId" />
</template>

<script>
import MovieImdb from "@/components/MovieImdb.vue";
export default {
name: 'ImdbView',
  components: {
    MovieImdb
  },
  data() {
      return {
          getId: this.$route.params.id
      }
  }

}
</script>

<style>

</style>