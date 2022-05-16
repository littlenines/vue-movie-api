<template>
  <div class="container">
    <section class="form">
      <h1 class="form-title">{{ formTitle }}</h1>
      <input
        type="text"
        class="form-username"
        placeholder="Username"
        v-model="inputUsername"
      />
      <input
        type="password"
        class="form-password"
        placeholder="Password"
        v-model="inputPassword"
      />
      <button class="form-submit" @click="logUser">{{ buttonText }}</button>
      <p class="form-error" v-if="isError">{{errorMessage}}</p>
    </section>
  </div>
</template>

<script>
import { setSession } from "@/utils/sessionStorage";
export default {
  name: "LogIn",
  data() {
    return {
      formTitle: "MOVIES",
      buttonText: "Login",
      inputUsername: "",
      inputPassword: "",
      errorMessage: 'Wrong username or password',
      isError: false,
    };
  },
  methods: {
    logUser() {
      if (this.inputUsername === "admin" && this.inputPassword === "admin") {
        setSession();
        this.isError = false;
        this.$router.push('/movies');
      } else {
        this.isError = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
