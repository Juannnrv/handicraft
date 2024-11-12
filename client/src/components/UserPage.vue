<template>
  <div class="user-page">
    <h1>Welcome, {{ user.displayName }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
  },
  mounted() {
    // Suponiendo que el backend ya ha asociado la sesión correctamente
    fetch('http://localhost:5000/user', {
      method: 'GET',
      credentials: 'include', // Incluir las cookies de sesión
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.displayName) {
          this.user = data; // Mostrar los datos del usuario si la autenticación fue exitosa
        }
      })
      .catch(() => {
        // Si ocurre un error, redirigir a la página de login
        // window.location.href = '/';
        console.log("murio");
      });
  }
};
</script>

<style scoped>
.user-page {
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
