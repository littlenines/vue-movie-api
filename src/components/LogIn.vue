<template>
  <div class="container">
    <section class="form">
        <h1 class="form-title">{{formTitle}}</h1>
        <input type="text" class="form-username" placeholder="Username" />
        <input type="password" class="form-password" placeholder="Password" />
        <button class="form-submit">{{buttonText}}</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      formTitle: 'MOVIES',
      buttonText: 'Login',
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
