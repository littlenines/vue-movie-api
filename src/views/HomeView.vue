<template >
  <div class="home">
    <LogIn />
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'HomeView',
  components: {
    LogIn
  }
}
</script>