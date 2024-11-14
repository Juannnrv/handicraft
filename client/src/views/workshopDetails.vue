<template>
    <div class="workshop-page">
      <div class="workshop-content">
        <div class="workshop-image-container">
          <img :src="workshop.photo" :alt="workshop.title" class="workshop-image">
          <img class="square-title" :src="rotatedSquare" alt="">
          <h1 class="workshop-title bellotaBold">{{ workshop.name }}</h1>
          <img class="square-bg" style="filter: invert(100%);" :src="rotatedSquare" alt="">
          <a class="a-back" href="workshops">
            <img class="back-arrow" style="filter: invert(100%);" :src="backArrow" alt="">
          </a>
        </div>
  
        <div class="workshop-details">
          <p class="workshop-description bellotaRegular">
             
            <strong class="bellotaBold">{{  }}</strong> 
            {{ }}
          </p>
  
          <div class="audience-section bellotaBold">
            <h2>{{ workshop.description }}</h2>
            <p class="note bellotaRegular">{{ workshop.materialsProvided }}</p>
          </div>
  
          <div class="info-grid bellotaRegular">
            <div class="info-item">
              <strong>Duración:</strong> {{ workshop.duration }}
            </div>
            <div class="info-item">
              <strong>Fecha de inicio:</strong> {{ formatDate(workshop.startDate) }}
            </div>
            <div class="info-item">
              <strong>Horario:</strong> {{ workshop.schedule }}
            </div>
            <div class="info-item">
              <strong>Materiales:</strong> {{ workshop.materialsRequired }}
            </div>
            <div class="info-item">
              <strong>Modalidad:</strong> {{ workshop.modality }}
            </div>
            <div class="info-item">
              <strong>Lugar:</strong> {{ workshop.location }}
            </div>
          </div>
  
          <div class="div-button">
            <button class="signup-button  bellotaBold" @click="handleSignup">
              <img style="width: 20px;" :src="suscribe" alt="">Inscribirse al taller
            </button>
            <span class="note bellotaRegular">*Cupos limitados</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import rotatedSquare from '../images/rotatedSquare.svg'
  import backArrow from '../images/backArrow.svg'
  import suscribe from '../images/suscribe.svg'
  
  // Variable para guardar los datos del taller
  const workshop = ref({})
  
  // Obtener el ID del taller desde la URL
  const getWorkshopIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('id') // Obtiene el parámetro "id" de la URL
  }

  // Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString)  // Convertimos la cadena a un objeto Date
  
  // Formateamos la fecha a "8 de julio de 2023"
  return date.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
  
  const workshopId = getWorkshopIdFromUrl()
  
  // Realizar la petición para obtener los datos del taller
  onMounted(async () => {
    try {
     console.log(workshopId)
      const response = await fetch(`http://localhost:5000/workshop/${workshopId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials: 'include', // Incluye las credenciales (como el token)
      })
  
      // Verificar si la respuesta es exitosa (status 200)
      if (response.ok) {
        const data = await response.json()  // Convertir la respuesta a JSON
        workshop.value = data.data
        workshop.value.materialsProvided = workshop.value.materialsProvided.join(', ')
        workshop.value.materialsRequired = workshop.value.materialsRequired.join(', ')
        console.log(data.data)  // Asignar los datos del taller
      } else {
        console.error('Error al obtener los datos del taller:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red o servidor:', error)
    }
  })
  
  // Función para manejar la inscripción (esto es solo un ejemplo)
  const handleSignup = () => {
    console.log('Inscribiéndose al taller:', workshopId)
    // Lógica para inscribirse al taller
  }
  </script>
  
  
    
    <style scoped>
    .workshop-page {

        min-height: 100vh;
        position: relative;
        height: 100vh;
        
    }
    
    .workshop-content{
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .workshop-image-container {
        position: relative;
    }
    
    .workshop-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .workshop-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #3D3D3D;
        color: white;
        padding: 10px;
        padding-left: 30px;
        margin: 0;
        font-size: 1em;
    }
    
    .workshop-details {
        flex-grow: 1;
        padding: 20px;
        overflow-y: scroll;
        scrollbar-width: none;
    }
    
    .workshop-description {
        font-size: 0.8em;
        margin-bottom: 14px;
    }
    
    .audience-section {
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 14px;
    }
    
    .audience-section h2 {
        margin: 0 0 4px 0;
        font-size: 1em;
    }
    
    .note {
        color: #666;
        font-size: 0.7em;
    }
    
    .info-grid {
        display: grid;
        gap: 1vh;
        margin-bottom: 10px;
    }
    
    .info-item {
        background-color: #fff;
        padding: 1px;
        border-radius: 8px;
        font-size: 0.9em;
    }
    
    .info-item strong {
        color: #333;
    }
    
    .signup-button {
        background-color: #D9D9D9;
        color: black;
        border: none;
        border-radius: 8px;
        padding: 10px;
        font-size: 0.8em;
        cursor: pointer;
       display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        gap: 5px;
    }
    
    .signup-button:hover {
        background-color: #444;
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

        .square-title{
            position: absolute;
            left: 0;
            bottom: 0px;
            height: 40px;
            z-index: 1;
    }
    .div-button{
        display: flex;
        gap: 20px;
        align-items: center;
    }
    
    @media (min-width: 768px) {
        .workshop-details {
        max-width: 800px;
        margin: 0 auto;
        }
    
        .info-grid {
        grid-template-columns: repeat(2, 1fr);
        }
    }

    </style>