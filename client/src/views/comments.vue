<template>
    <div class="feedback-container">
        <header class="header">
        <img class="square-bg" :src="rotatedSquare" alt="">
        <a class="a-back" href="home">
            <img class="back-arrow" :src="backArrow" alt="">
        </a>
        <img class="title-square" :src="titleSquare" alt="">
        <h1 class="bellotaBold">Comentarios a la app</h1>
      </header>
  
      <div class="scroll">
      <form @submit.prevent="handleSubmit" class="feedback-form">
        <section class="common-problems">
          <h2 class="bellotaBold">Problemas frecuentes</h2>
          <div class="problems-list">
            <button
              v-for="(problem, index) in commonProblems"
              :key="index"
              type="button"
              class="bellotaBold"
              :class="['problem-button', { selected: selectedProblem === problem } ] "
              @click="selectProblem(problem)"
            >
              {{ problem }}
            </button>
          </div>
        </section>
  
        <section class="other-feedback">
          <h2 class="bellotaBold">Otro</h2>
          <textarea
          class="bellotaBold"
            v-model="customFeedback"
            placeholder="Describe aquí tu problema..."
            rows="5"
          ></textarea>
        </section>
  
        <div class="form-actions">
          <button type="submit" class="submit-button bellotaBold">
            Enviar
          </button>
        </div>
      </form>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import titleSquare from '../images/titleSquare.svg'
  import rotatedSquare from '../images/rotatedSquare.svg'
  import backArrow from '../images/backArrow.svg'
  import Swal from 'sweetalert2' // Importar SweetAlert2
  
  const commonProblems = [
    'La aplicación no carga de manera correcta',
    'Errores al querer comprar en la aplicación',
    'No puedo ver las imágenes de las tiendas y/o artesanías',
    'No me permite usar un cupón de descuento',
    'No me deja inscribirme a los talleres',
    'El QR interactivo no funciona de manera correcta'
  ]
  
  const selectedProblem = ref('')
  const customFeedback = ref('')
  
  const selectProblem = (problem) => {
    selectedProblem.value = problem
  }
  
  // Función para manejar el envío
  const handleSubmit = async () => {
    try {
      console.log('Submitting feedback:', {
        selectedProblem: selectedProblem.value,
        customFeedback: customFeedback.value,
      })
  
      // Simula una solicitud exitosa
      setTimeout(() => {
        Swal.fire({
          title: '¡Comentario enviado!',
          text: 'Gracias por ayudarnos a mejorar nuestra aplicación.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
      }, 500) // Simula un retraso en la respuesta del servidor
    } catch (error) {
      console.error('Error al enviar el comentario:', error)
  
      // Muestra un mensaje de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar tu comentario. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })
    }
  }
  </script>
  
  <style scoped>
  .feedback-container {
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 24px;
    padding: 8px;
    cursor: pointer;
    margin-right: 16px;
  }
  
  h1 {
    font-size: 16px;
    margin: 0;
    text-align: center;
    width: 100px;
  }
  
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  .problems-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
  }
  
  .problem-button {
    width: 100%;
    padding: 12px;
    text-align: left;
    background-color: #D9D9D9;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .problem-button:hover {
    background-color: #ebebeb;
  }
  
  .problem-button.selected {
    background-color: #e0e0e0;
    border: 2px solid #666;
  }
  
  textarea {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 8px;
    background-color: #D9D9D9;
    font-size: 14px;
    resize: vertical;
    margin-bottom: 24px;
  }
  
  textarea:focus {
    outline: none;
    background-color: #ebebeb;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;

  }
  
  .attach-button, .submit-button {
    padding: 7px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .attach-button {
    background-color: #3D3D3D;
    color:  white;
 
  }
  
  .attach-button:hover {
    background-color: #D9D9D9;
    color: black;
  }
  
  .submit-button {
    background-color: #3D3D3D;
    color: white;

  }
  
  .submit-button:hover {
    background-color: #D9D9D9;
    color: black;
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
    .scroll{
      height: 100%;
      overflow-y: scroll;
      scrollbar-width: none;
    }
  </style>