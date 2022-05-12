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
            <slot name="body"
              ><img :src="movieInfo.img" :alt="movieInfo.title" class="modal-img"
            /></slot>
            <slot name="body"
              ><p>
                Release date: <span>{{ movieInfo.release_date }}</span>
              </p></slot
            >
            <slot name="body"
              ><p>
                Score: <span>{{ movieInfo.vote_average }}</span>
              </p></slot
            >
            <slot name="body"
              ><p>
                <span class="modal-overview">{{ movieInfo.overview }}</span>
              </p></slot
            >
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <router-link
                :to="{ name: 'MovieImdb', params: { id: movieInfo.movie_id } }"
                ><a class="modal-default-button">
                  See More...
                </a></router-link
              >
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

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h2 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;

  p {
    color: #42b983;
    font-weight: bold;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  span {
    color: #000;
    font-weight: normal;
  }
}

.modal-img {
  margin-bottom: 10px;
}

.modal-overview {
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 10; 
           line-clamp: 10; 
   -webkit-box-orient: vertical;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>