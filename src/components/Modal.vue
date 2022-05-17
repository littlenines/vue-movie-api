<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div
          class="modal-container"
          @click.stop
          v-for="movieInfo in info"
          :key="movieInfo.id"
        >
          <div class="modal-header">
            <slot name="header"
              ><h2>{{ movieInfo.title }}</h2></slot
            >
          </div>

          <div class="modal-body">
            <slot
              ><img
                :src="movieInfo.img"
                :alt="movieInfo.title"
                class="modal-img"
            /></slot>
            <slot
              ><p>
                Release date: <span>{{ movieInfo.release_date }}</span>
              </p></slot
            >
            <slot
              ><p>
                Score: <span>{{ movieInfo.vote_average }}</span>
              </p></slot
            >
            <slot
              ><p>
                <span class="modal-overview">{{ movieInfo.overview }}</span>
              </p></slot
            >
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <router-link
                :to="{ name: 'MovieImdb', params: { id: movieInfo.movie_id } }"
                class="modal-default-button"
              >
                See More...
              </router-link>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    info: Array,
  },
};
</script>

<style lang="scss">
</style>