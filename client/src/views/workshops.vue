<template>
  <div class="page-container">
    <header class="header">
      <img class="square-bg" :src="rotatedSquare" alt="">
      <a class="a-back" href="home">
        <img class="back-arrow" :src="backArrow" alt="">
      </a>
      <img class="title-square" :src="titleSquare" alt="">
      <h1 class="title bellotaBold">
        Talleres<br>
        educativos
      </h1>
    </header>

    <div class="search-container">
      <div class="search-bar">
        <img style="width: 20px; margin-right: 10PX;" :src="glass" alt="">
        <input 
          class="bellotaRegular"
          type="text" 
          placeholder="Buscar taller, por categoría o artesanos"
          v-model="searchQuery"
          @keyup.enter="searchWorkshops" 
        >
      </div>
    </div>

    <div class="workshops-container">
      <div class="workshop-card" v-for="workshop in filteredWorkshops" :key="workshop.id">
        <div class="workshop-image-div">
          <img :src="workshop.photo" :alt="workshop.title" class="workshop-image">
        </div>
        <div class="workshop-info">
          <h2 class="workshop-title bellotaBold">{{ workshop.name }}</h2>
          <p class="workshop-audience bellotaRegular"><u>{{ workshop.modality }}</u></p>
          <p class="workshop-instructor bellotaBold">{{ workshop.description }}</p>
          <button 
            class="learn-more-button bellotaBold"
            @click="goToWorkshopDetails(workshop._id)"
          >
            <u>Entérate más sobre el taller aquí</u>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'  // Importamos el router
import titleSquare from '../images/titleSquare.svg'
import rotatedSquare from '../images/rotatedSquare.svg'
import backArrow from '../images/backArrow.svg'
import glass from '../images/glass.svg'

// Variables de estado
const searchQuery = ref('')
const workshops = ref([])  // Talleres completos (todos los talleres)
const filteredWorkshops = ref([])  // Talleres filtrados (según la búsqueda)

const allWorkshops = ref([])  // Guardamos los talleres originales para no perderlos al filtrar

// Obtener la instancia del router
const router = useRouter()

// Hacer la solicitud HTTP cuando el componente se monte
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/user/favorites', {
      method: 'GET',  // Usamos GET para obtener los datos
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      },
      credentials: 'include'  // Necesitamos incluir el token de autenticación para la solicitud
    })

    // Verificamos que la respuesta sea exitosa (status 200)
    if (response.ok) {
      const data = await response.json() // Convertimos la respuesta a JSON
      allWorkshops.value = data.data.workshops  // Guardamos los talleres originales
      workshops.value = [...allWorkshops.value]  // Inicializamos workshops con los talleres completos
      filteredWorkshops.value = [...workshops.value]  // Inicializamos filteredWorkshops con todos los talleres
      console.log(data.data)
    } else if (response.status === 401) {
      // Si la respuesta es 401, redirigimos al login
      console.log('No autorizado, redirigiendo al login...')
      router.push('/login')  // Redirige a la página de login usando Vue Router
    } else {
      console.error('Error al obtener los talleres:', response.statusText)
    }
  } catch (error) {
    console.error('Error de red o servidor:', error)
  }
})

// Método para realizar la búsqueda de talleres
const searchWorkshops = () => {
  if (searchQuery.value.trim() === '') {
    // Si no hay texto en el campo de búsqueda, mostrar todos los talleres
    filteredWorkshops.value = [...workshops.value]
  } else {
    // Filtramos los talleres según el término de búsqueda
    filteredWorkshops.value = workshops.value.filter(workshop =>
      workshop.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      workshop.modality.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
}

// Método para redirigir a la página de detalles del taller
const goToWorkshopDetails = (workshopId) => {
  // Redirigimos al workshop details con el id del taller como parámetro
  router.push(`/workshopQR?id=${workshopId}`)
}
</script>
  
  
  <style scoped>
  .page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    padding: 20px;
    position: relative;
  }
  
  
  .title {
    text-align: center;
    font-size: 16px;
    margin: 0;
    line-height: 1.2;
  }
  
  .search-container {
    padding: 0 20px;
    margin-bottom: 20px;
  }
  
  .search-bar {
    background-color: #e0e0e0;
    border-radius: 25px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    margin-right: 10px;
    color: #666;
  }
  
  .search-bar input {
    border: none;
    background: none;
    width: 100%;
    font-size: 0.8em;
    color: #333;
  }
  
  .search-bar input:focus {
    outline: none;
  }
  
  .workshops-container {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px;
  }
  
  .workshop-card {
    background-color: #d6d6d6;
    border-radius: 15px;
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: relative;
    height: 135px;
  }
  
  .workshop-image-div {
    width: 135px;
    height: 100%;
    border-radius: 15px;
    background-color: green;
    position: relative;
    overflow: hidden; 
}

.workshop-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta la imagen para cubrir completamente el contenedor */
}
  
  .workshop-info {
    padding: 10px;
    flex: 1;
  }
  


  .workshop-title {
    font-size: 0.8em;
    color: #333;
  }
  
  .workshop-audience {
    font-size: 0.8em;
    color: #666;
    margin: 0 0 4px 0;
  }
  
  .workshop-instructor {
    font-size: 0.8em;
    color: #666;
    margin: 0 0 5px 0;
  }
  
  .learn-more-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.6em;
    cursor: pointer;
  }
  
  .learn-more-button:hover {
    background-color: #444;
  }
  
  /* For webkit browsers */
  .workshops-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .workshops-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .workshops-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  .workshops-container::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
  .title-square{
    width: 80px;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    z-index: -1;
}
.square-bg{
          position: absolute;
          left: 0;
          top: 0px;
          width: 40px;
      }
  
      .a-back{
      position: absolute;
      width: 25px;
      left: 3px;
      top: 25px;
      display: flex
    }
  
    .a-back > img{
      width: 100%;
    }
    .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  }
  </style>