<template>
  <div class="user-page">
    <!-- Mostrar el username aquí -->
    <h1 v-if="user">Welcome, {{ user }}</h1>
    <p v-else>Loading...</p> <!-- Mensaje cuando los datos no están cargados aún -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}, // Inicializamos un objeto vacío para almacenar los datos del usuario
    };
  },
  mounted() {
    // Hacer la solicitud al backend para obtener los datos del usuario
    fetch('http://localhost:5000/user/favorites', {
      method: 'GET',
      credentials: 'include', // Incluir las cookies de sesión
      headers: {
        "x-version": "1.0.0",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) { // Verifica que la respuesta contenga un username
          this.user = data; // Asignamos los datos del usuario al estado
          console.log(data); // Puedes ver los datos del usuario en la consola
        } else {
          console.log("User data not found");
        }
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        // Aquí puedes redirigir a la página de login si lo necesitas
        // window.location.href = '/login';
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
