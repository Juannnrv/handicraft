<template>
  <div id="app">
    <!-- Contenedor principal de la aplicación -->
    <router-view></router-view> <!-- Aquí se renderizarán las vistas según las rutas configuradas -->
  </div>
</template>

<script>
export default {
  name: 'App',
  // Aquí no necesitamos lógica adicional por ahora
}
</script>

<style>
/* Estilos globales opcionales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
