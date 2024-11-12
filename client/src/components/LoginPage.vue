<template>
  <div class="login-page">
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="loginWithDiscord">Login with Discord</button>
    <button @click="loginWithFacebook">Login with Facebook</button>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithGoogle() {
      window.location.href = 'http://localhost:5000/auth/google';  // Redirige al backend para iniciar sesión con Google
    },
    loginWithDiscord() {
      window.location.href = 'http://localhost:5000/auth/discord';  // Redirige al backend para iniciar sesión con Discord
    },
    loginWithFacebook() {
      window.location.href = 'http://localhost:5000/auth/facebook';  // Redirige al backend para iniciar sesión con Facebook
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
