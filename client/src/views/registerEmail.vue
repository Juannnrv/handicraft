<template>
  <div class="registration-container">
    <img class="squareBG" :src="squareBG" alt="">
    <img class="square-bg" :src="rotatedSquare" alt="">
    <a class="a-back" href="">
      <img class="back-arrow" :src="backArrow" alt="">
    </a>

    <form @submit.prevent="handleSubmit" class="registration-form">
      <div class="form-group">
        <label class="bellotaBold">Nombre de usuario*</label>
        <small class="bellotaRegular">* Crea un nombre de usuario de mínimo 5 y máximo de 15 caracteres.</small>
        <input type="text" v-model="formData.username" required minlength="5" maxlength="15">
      </div>

      <div class="form-group">
        <label class="bellotaBold">Correo electrónico*</label>
        <input type="email" v-model="formData.email" required>
      </div>

      <div class="form-group">
        <label class="bellotaBold">Confirma tu correo*</label>
        <input type="email" v-model="emailConfirmation" required>
      </div>

      <div class="form-group">
        <label class="bellotaBold">Contraseña*</label>
        <input type="password" v-model="formData.password" required>
        <small class="bellotaRegular">Recuerda crear una contraseña difícil de adivinar</small>
      </div>

      <div class="form-group">
        <label class="bellotaBold">Confirma tu contraseña*</label>
        <input type="password" v-model="passwordConfirmation" required>
      </div>

      <div class="form-group">
        <label class="bellotaBold">Sexo</label>
        <select v-model="formData.gender">
          <option value=""></option>
          <option value="hombre">Masculino</option>
          <option value="mujer">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label class="bellotaBold">Fecha de nacimiento</label>
        <div class="date-selects">
          <select v-model="birthDate.day">
            <option value="">DD</option>
            <option v-for="day in 31" :key="day" :value="day">
              {{ String(day).padStart(2, '0') }}
            </option>
          </select>

          <select v-model="birthDate.month">
            <option value="">MM</option>
            <option v-for="month in 12" :key="month" :value="month">
              {{ String(month).padStart(2, '0') }}
            </option>
          </select>

          <select v-model="birthDate.year">
            <option value="">YYYY</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="continue-div">
        <strong class="bellotaBold">></strong>
        <a @click="handleSubmit" class="continue bellotaRegular">
          Continuar
        </a>
      </div>
    </form>

    <!-- Mensajes de error -->
    <div v-if="formError" class="error-message">
      <p>{{ formError }}</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import rotatedSquare from '../images/rotatedSquare.svg'
import backArrow from '../images/backArrow.svg'
import squareBG from '../images/squareBG.svg'

// Limpiar localStorage (si lo deseas)
  localStorage.clear()

// Datos del formulario
const formData = ref({
  username: '',
  email: '',
  password: '',
  profilePicture: 'https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg',
  address: '',
  phone: '',
  type: 'comprador', 
  favorites: [],
  purchases: [],
  workshopsEnrolled: [],
  coupons: [],
  gender: '',
  birthday: ''
})

const emailConfirmation = ref('')
const passwordConfirmation = ref('')
const birthDate = ref({
  day: '',
  month: '',
  year: ''
})

const formError = ref('') // Para almacenar los errores
const savedData = ref(null) // Para almacenar el diccionario completo con los datos recibidos

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push(year)
  }
  return years
})

// Validaciones del formulario
const validateForm = () => {
  // Limpiar errores
  formError.value = ''

  // Validar que los correos electrónicos coincidan
  if (formData.value.email !== emailConfirmation.value) {
    formError.value = 'Los correos electrónicos no coinciden'
    return false
  }

  // Validar formato de correo electrónico
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(formData.value.email)) {
    formError.value = 'Por favor ingresa un correo electrónico válido'
    return false
  }

  // Validar que las contraseñas coincidan y tengan al menos 6 caracteres
  if (formData.value.password !== passwordConfirmation.value) {
    formError.value = 'Las contraseñas no coinciden'
    return false
  }
  if (formData.value.password.length < 6) {
    formError.value = 'La contraseña debe tener al menos 6 caracteres'
    return false
  }

  // Validar la fecha de nacimiento
  if (!birthDate.value.day || !birthDate.value.month || !birthDate.value.year) {
    formError.value = 'Por favor complete la fecha de nacimiento'
    return false
  }

  // Asegurar que el género sea uno de los valores esperados
  if (formData.value.gender !== 'hombre' && formData.value.gender !== 'mujer') {
    formError.value = 'Por favor selecciona un género válido'
    return false
  }

  return true
}

// Función para enviar el formulario de validación
const handleSubmit = async () => {
  if (!validateForm()) return

  // Formatear la fecha de nacimiento en formato MM/DD/YYYY
  const formattedBirthday = `${String(birthDate.value.month).padStart(2, '0')}/${String(birthDate.value.day).padStart(2, '0')}/${birthDate.value.year}`

  // Prepara los datos a enviar con los campos requeridos para el formulario
  const dataToSubmit = {
    username: formData.value.username,
    email: formData.value.email,
    phone: " "
  }

  try {
    console.log('Formulario de validación:', JSON.stringify(dataToSubmit))

    // Enviar la solicitud POST a la URL correcta para validación
    const response = await fetch('http://localhost:5000/auth/check', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-version": "1.0.0"
      },
      body: JSON.stringify(dataToSubmit) // Aquí se envía el objeto con email, username y phone (opcionales)
    })

    if (response.status === 400) {
      const errorData = await response.json()
      formError.value = errorData.message || 'Error desconocido'
    } else if (response.status === 200) {
      // Si la respuesta es 200, guardamos los datos en localStorage para usarlo después
      const responseData = await response.json()
      savedData.value = responseData
      console.log('Datos guardados para confirmación:', savedData.value)

      // Guardar los datos completos en localStorage en el formato deseado
      const savedFormData = {
        username: formData.value.username,
        password: formData.value.password,
        email: formData.value.email,
        gender: formData.value.gender,
        birthday: formattedBirthday
      }

      localStorage.setItem('savedData', JSON.stringify(savedFormData)) // Guardamos los datos formateados

      // Redirigir al siguiente paso
      location.href = "confirmRegisterEmail" // Redirigir o manejar el siguiente paso
    } else {
      formError.value = 'Error en el registro. Por favor intente nuevamente.'
    }
  } catch (error) {
    console.error('Error en el registro:', error)
    alert('Error en el registro. Por favor intente nuevamente.')
  }
}
</script>


  <style scoped>
  .error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
    .square-bg{
        position: absolute;
        left: 0;
        top: 0px;
        width: 40px;
    }

  .registration-container {
    max-width: 400px;
    margin: 0px 30px;
    padding: 20px;
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
  
 
  
  .registration-form {
    height: 87vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  label {
    font-size: 16px;
    color: #333;
  }
  
  input, select {
    padding: 12px;
    border: none;
    background-color: #bebebe;
    border-radius: 4px;
    font-size: 16px;
  }
  
  input:focus, select:focus {
    outline: none;
    background-color: #e8e8e8;
  }
  
  small {
    color: #666;
    font-size: 12px;
  }
  
  .date-selects {
    display: flex;
    gap: 10px;
  }
  
  .date-selects select {
    flex: 1;
  }
  
  .continue-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .continue-button:hover {
    background-color: #444;
  }

  .continue-div{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 17px;
    position: absolute;
    top: 92vh;
    right: 50px;
  }

  .continue-div > strong{
    font-size: 30px;
  }
  .continue{
    color: black;
  }
  .squareBG{
    width: 60vh;
    position: absolute;
    bottom: 0;
    right: -29vh;
    z-index: -1;
  }
  </style>
  