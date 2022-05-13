<template>
    <nav>
    <router-link to="/Movies">Movies</router-link>
  </nav>
  <div class="about">
    <Genre />
  </div>
</template>

<script>
import Genre from '@/components/MovieGenre.vue'
export default {
    components: {
    Genre
  }
}
</script>