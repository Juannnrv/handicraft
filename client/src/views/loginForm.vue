<template>
    
    <div class="login-container">
      <img class="squareBGTop" :src="squareBG" alt="">
      <img class="squareBG" :src="squareBG" alt="">
      <img class="square-bg" :src="rotatedSquare" alt="">
      <a class="a-back" href="login">
        <img class="back-arrow" :src="backArrow" alt="">
      </a>
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="identifier" class="bellotaBold">Nombre de usuario, celular o correo</label>
          <input 
            type="text" 
            id="username" 
            v-model="identifier"
            required
          >
        </div>
  
        <div class="form-group">
          <label for="password" class="bellotaBold">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            required
          >
        </div>
  
        <div class="options">
          <button type="submit" class="login-button bellotaRegular">
            Iniciar sesión
          </button>
    
          <a href="#" class="forgot-password bellotaRegular">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import rotatedSquare from '../images/rotatedSquare.svg'
import backArrow from '../images/backArrow.svg'
import squareBG from '../images/squareBG.svg'

const identifier = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-version': '1.0.0'
      },
      body: JSON.stringify({
        identifier: identifier.value,
        password: password.value
      }),
      credentials: 'include'
    })

    if (response.ok) {
      // Alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido de nuevo!',
        confirmButtonColor: '#3085d6',
        timer: 2000
      })

      // Redirigir al home
      setTimeout(() => {
        router.push('/home')
      }, 2000)
    } else {
      const errorData = await response.json()
      // Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: errorData.message || 'Credenciales incorrectas. Por favor, intenta nuevamente.',
        confirmButtonColor: '#d33'
      })
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    // Alerta de fallo en la solicitud
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'Hubo un problema con el servidor. Intenta nuevamente más tarde.',
      confirmButtonColor: '#d33'
    })
  }
}
</script>



  
  <style scoped>
  .login-container {
    min-height: 100vh;
    padding: 0px 45px;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  
  .arrow-left {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-left: 2px solid #333;
    border-bottom: 2px solid #333;
    transform: rotate(45deg);
  }
  
  .login-form {
    width: 100%;
    margin: 60px auto 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-weight: 700;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  label {
    font-size: 14px;
    color: #333;
  }
  
  input {
    padding: 12px;
    border: none;
    background-color: #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
  }
  
  input:focus {
    outline: none;
    background-color: #d5d5d5;
  }
  
  .login-button {
    background: transparent;
    border: none;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .forgot-password {
    color: #333;
    text-decoration: underline;
    text-align: center;
    font-size: 14px;
  }
  
  .login-button:hover,
  .forgot-password:hover {
    opacity: 0.8;
  }

  .squareBG{
    width: 60vh;
    position: absolute;
    bottom: -35vh;
    left: -29vh;
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

  .squareBGTop{
    width: 60vh;
    position: absolute;
    top: -36vh;
    right: -29vh;
    z-index: -1;
  }

  .options{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  label{
    font-size: 1rem;
    font-weight: bold;
  }
  button{
    font-weight: 200;
  }
  </style>